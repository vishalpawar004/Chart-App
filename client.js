const socket = io("http://localhost:8000")
const name = prompt("Enter Your Name: ")
socket.emit("user-joined",name)   //fired to event to server
socket.on("new-user-joined",name=>{ //lisened user
    // console.log(name);
    if(name)
    generateMessage("center",`${name} Joined the Chat`) 
})
const first = document.querySelector(".first")
function generateMessage(side,message){
    var div = document.createElement("div")
    div.innerHTML = message
    div.classList.add("alert")
    if(side=="left")
    {
        div.classList.add("alert-primary")

    }
    else if(side=="right"){
        div.classList.add("alert-secondary")
    }
    else{
    div.classList.add("alert-danger")

    }

    first.appendChild(div)
}

function sendMessage(){
    let input = document.getElementById("message")
    generateMessage("right",`${input.value} : You`)
    socket.emit("send",input.value)
    input.value = ""

}

socket.on("receive",({name,message})=>{ //lisened user
    // console.log(name);
  
    generateMessage("left",`${name} : ${message}`) 
})

socket.on("user-left",(name)=>{ //lisened user
    if(name)
    generateMessage("center",`${name} : left the chat`) 
})