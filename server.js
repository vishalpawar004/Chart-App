

const io = require("socket.io")(8000,{
//   cors:"*" //access to everyone
  cors:"http://localhost:5500" //access to particular

})
let users = {}
io.on("connect",(socket)=>{
// console.log("Connect");
socket.on("user-joined",(name)=>{  //lesened user joined -> users
    users[socket.id] = name
    // console.log(users);
    socket.broadcast.emit("new-user-joined",name) //broadcast is notification to another user
})

socket.on("send",(message)=>{
  socket.broadcast.emit("receive",{name:users[socket.id], message:message})
})
socket.on("disconnect",()=>{
  socket.broadcast.emit("user-left",users[socket.id])
  delete users[socket.id]
})

})
