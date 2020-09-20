import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom"
import M from 'materialize-css'
import io from "socket.io-client";

//const socket = io.connect('http://localhost:5000')
const socket = io.connect('https://whatsappclone17.herokuapp.com/')


function PrivateChat() {
    const history = useHistory()
    const [user, setUser] = useState()
    var [actname, setActName] = useState("")
    var [actnumber, setActNuber] = useState("")
    const [chatmsg, setChatMsg] = useState()

    var number = 838;
    useEffect(() => {
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
    }, [])
    const setActive = (argname, argnumber) => {
        setActName(argname)
        setActNuber(argnumber)
        actname = argname;
        actnumber = argnumber;
        var hi = document.getElementById("hi")
        hi.innerHTML=""
        var number2 = localStorage.getItem("number")
        // socket.on(`${argnumber}${number2}`,(result)=>{
        socket.on(`${number2}${argnumber}`, (result) => {
            var hi = document.getElementById("hi")
            var p = document.createElement('p')
            p.innerHTML = `${actname} : ${result}`
            hi.appendChild(p)
        })
        socket.on(`${argnumber}${number2}`, (result) => {
          
            var hi = document.getElementById("hi")
            var p = document.createElement('p')
            p.innerHTML =`you : ${result}`
            hi.appendChild(p)
        })
    }
    var post = () => {
        var number2 = localStorage.getItem("number")
        socket.emit("sendprivate", { message2: chatmsg, number2, actnumber })
    }

    return (
        <>{user ?
            <div>
                <div className="main-cointainer">
                    <div className="contact-con">
                        {user.map(items =>
                            <div>
                                {items.number != localStorage.getItem("number") &&
                                    <div>
                                        <div className="user-detail"
                                            onClick={() => setActive(items.name, items.number)}
                                        >
                                            <div className="pro-img">
                                                <img src="https://cdn.pixabay.com/photo/2016/01/20/23/10/bowie-1152551_960_720.png" alt="ijsj" />
                                            </div>
                                            <div >
                                                <p>{items.name}</p>
                                                <p>{items.number}</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <hr />
                            </div>
                        )}

                    </div>
                    <div className="private-chatbox">
                        <div className="user-detail-active">
                            <div className="pro-img-active">
                                <img src="https://cdn.pixabay.com/photo/2016/01/20/23/10/bowie-1152551_960_720.png" alt="ijsj" />
                            </div>
                            <div >
                                <p>{actname}</p>
                                <p>{actnumber}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="chat-msg">
                            messages
                        <div id="hi"></div>
                        </div>

                        <div className="msg-type-box">
                            <input className="msg-type-box-input" type="text" placeholder="  type here"
                                value={chatmsg}
                                onChange={(e) => setChatMsg(e.target.value)}
                            />
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <button
                                onClick={post}
                            >send</button>
                        </div>
                    </div>
                </div>
            </div>
            :
            "loading"
        }       </>
    );
}

export default PrivateChat;
