const express=require("express");
const app=express();
const server= require('http').createServer(app);
const io=require('socket.io')(server);

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
});
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
});

let responses =[
    {
        query:"whats the time?",
        response: new Date().toUTCString()
    },
    {
        query:"How are you?",
        response:"I am a AI, I have no concept of good or bad."
    }
]


io.on("connection",(socket)=>{
    console.log("new user is connection to the server");
    let name;

    socket.on("new user",(username)=>{
        name=username;
        const str = name + 'joined';
        io.emit('new message',str);
    });

    
    socket.on('new message',(message)=>{
        let str;
        if(message == "whats the time?"){
            str = new Date().toISOString();
        }
        io.emit('new message',str);
    });

    socket.on("disconnect",()=>{
        const str =name + "left";
        io.emit('new message',str);
    });
});

server.listen(3000,()=>{console.log("Application started on port 3000");})