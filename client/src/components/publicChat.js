import React, {useEffect, useState } from 'react';
import {BrowserRouter,Route, useHistory} from 'react-router-dom'
import io from "socket.io-client";

//const socket = io.connect('http://localhost:5000')
const socket = io.connect('https://whatsappclone17.herokuapp.com/')

socket.on("name",(name)=>{
    console.log(name)
})


socket.on("receive",(message2,name2)=>{
    var span = document.createElement('span')
    var div = document.createElement('div')
    var p = document.createElement('p')
    p.innerHTML=`${message2.name2} :${message2.message2}`
    console.log(message2)   
    //span.innerHTML=message2.name2
 //   div.appendChild(span)
    div.appendChild(p)
    document.getElementById("message").appendChild(div)
    console.log()
})



function PublicChat() {
    
    const history = useHistory()
    const [chatmsg, setChatMsg]=useState()
    const [user, setUser] = useState()

    var number = 838;
    
    


useEffect(()=>{
    fetch('/userData', {
        method: "post",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt"),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            number,
        })
    }).then(res => res.json())
        .then(result => {
           if(result.error){
               history.push("/signin")
           }
            setUser(result)

        })

    var jwtchecking = localStorage.getItem('jwt')
    
    var name=localStorage.getItem("name")
   var load=localStorage.getItem("load")
    localStorage.removeItem("load")
    if(load==true){
        socket.emit("join",name)  
    }
    var  load=localStorage.setItem("load",false)
},[])

var post=()=>{
   var name2=localStorage.getItem("name")
   socket.emit("send",{message2:chatmsg,name2})        
}


    return (
    <div >
        <div className="msgbox-pub"
        
        >
            <span>public chat</span>
            <div id="message"></div>
        </div>  
        <input 
        value={chatmsg}
        onChange={(e)=>setChatMsg(e.target.value)}
        className="msgbox-pub-input"
        style={{width:"400px",marginLeft:"420px"}}
        placeholder="type here"
        />
        <button
        onClick={post}
        className="waves-effect waves-light btn #64b5f6 greenyellow lighten-2 s6"
            style={{}}
            >
            send
        </button>
 

    </div>
  );
}

export default PublicChat;
