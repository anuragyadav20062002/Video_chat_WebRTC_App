const express = require('express')
const {Server} = require('socket.io')
const bodyParser = require('body-parser')

const io = new Server();
const app = express();

app.use(bodyParser.json());

const emailToSocketMapping = new Map();


io.on("connection", (socket)=>{
    socket.on("join-room", (data)=>{
        const {roomId, emailID}= data;
        console.log("User", emailID , "Joined room" , roomId)
        emailToSocketMapping.set("user-joined",{emailID})
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-joined', {emailID})
    });
    console.log("New connection");
});

app.listen(8000,()=>console.log("Http server running att PORT 8000"));;
io.listen(8001);