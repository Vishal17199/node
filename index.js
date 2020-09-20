const Port = process.env.port || 3000 || 4000 || 5000
const express = require('express')
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser')
const database = require('./database')

const app= express()
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cors())
require("./model/user")
app.use(require("./routes/routes"))




const users={}
io.on('connect',(socket)=>{
    console.log("connected")
    socket.on("join",(name)=>{
        users[socket.id]=name;
        socket.broadcast.emit("name",`${name} has joined`)
    })

    socket.on("send",(message2,name2)=>{
        socket.broadcast.emit("receive",message2,name2)
        socket.emit("receive",message2,name2)
    })
    socket.on("sendprivate",(message,number2,actnumber)=>{
        console.log("message",message.message2)
        console.log("sender",message.number2)
        console.log("receiver",message.actnumber)
        socket.broadcast.emit(`${message.actnumber}${message.number2}`,message.message2)
        socket.emit(`${message.actnumber}${message.number2}`,message.message2)
 
    })

 //   socket.on('disconnect', function () {
 //       socket.removeAllListeners("join");
 //       socket.removeAllListeners("send");
 //       socket.removeAllListeners('disconnect');
 //       io.removeAllListeners('connection');
 //   });
})



if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



server.listen(Port,()=>{
    console.log("server is runiig")
})