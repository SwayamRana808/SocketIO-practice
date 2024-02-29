import express from "express"
import {Server} from "socket.io";
import {createServer} from "http";
import cors from "cors"
const port =3000;
const app = express()
const server = createServer(app);

const io= new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    }
});
io.on("connection",(socket)=>{ //connection event: Fired when a new client connects to the server.
    console.log("USer connected",socket.id)
    socket.on("message",(data)=>{
       console.log(data)
    //    io.emit("receive-msg",`${data} is being send by user ${socket.id}`) // to send to everyone including yourself
       socket.broadcast.emit("receive-msg",`${data} is being send by user ${socket.id}`) //send to others but not to yourself
    })
    //socket.on("disconnect", ...) is a built-in event in Socket.IO. It is triggered when a socket (client) disconnects from the server.
    socket.on("disconnect",()=>{ 
        console.log("User disconnected",socket.id);
    })
    // socket.emit("welcomeEVENT",`welcome to the server ${socket.id}`) // use to send event 
    // socket.broadcast.emit("welcomeEVENT",`${socket.id} user has joined the server`) // sends message to other sockets not to itself (used when like-this user has joined)
})
app.use(cors())   
/**
 * instead of cors() you can also use it like this cors({
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials:true,
})
 */
app.get("/",(req,res)=>{
    res.send("hello world");
})
//server.listen not app.listen
server.listen(port,()=>{ 
  console.log(`the server is running on ${port}`);
});