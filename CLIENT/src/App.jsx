 import {io} from "socket.io-client"
 import { useEffect,useState,useMemo } from "react"
 import { Button, Container, Stack, TextField, Typography } from "@mui/material"
const App=()=>{
  const [message,setMessage]=useState("")
  const [messageLIST,setMessageLIST]=useState([])
  const [room,setRoom]=useState("")
  const [socketid,setsocketid]=useState("")
  const [roomName,setRoomName]=useState("")
  const [leaveroomName,setLeaveRoomName]=useState("")
  useEffect(()=>{
    socket.on("connect",()=>{  // event triggers when connection is made 
        console.log("connected...",socket.id)   
        setsocketid(socket.id)
    })
    socket.on("welcomeEVENT",(datafromserver)=>{
      console.log(datafromserver)
    })
    socket.on("receive-msg",(data_msg)=>{
      console.log(data_msg)
      setMessageLIST((messageLIST)=>[...messageLIST,data_msg])
    })

    return ()=>{
        socket.disconnect();
    }
     
    
  },[])
  const socket=useMemo(()=>io("http://localhost:3000"),[]) //useMemo is used so it dont create new socket after message being sent
  const handleSubmit=(e)=>{
      e.preventDefault()
      if(room==""){
      socket.emit("message",{message,room})
      }else{
        socket.emit("messageTO",{message,room})
      }
      setMessage("")
      setRoom("")
  }
  const joinRoomHandler=(e)=>{
    e.preventDefault()
    socket.emit("join-room",roomName)
    setRoomName("")
  }
  const leaveRoomHandler=(e)=>{
    e.preventDefault()
    socket.emit("leave-room",leaveroomName)
    setRoomName("")
  }
  return (
     <Container maxWidth="sm">
      <Typography variant="h3" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
         {socketid}
      </Typography>
      <form onSubmit={joinRoomHandler}>
      <TextField value={roomName} onChange={(e)=>{setRoomName(e.target.value)}} id="outlined-basic" label="Room Name" variant="outlined"></TextField>
      <Button type="submit" variant="contained" color="primary" >JOIN</Button>
      </form>
      <form onSubmit={handleSubmit}>
        <TextField value={message} onChange={(e)=>{setMessage(e.target.value)}} id="outlined-basic" label="Message" variant="outlined"></TextField>
        <TextField value={room} onChange={(e)=>{setRoom(e.target.value)}} id="outlined-basic" label="Room" variant="outlined"></TextField>
        <Button type="submit" variant="contained" color="primary" >Send</Button>
      </form>
      <form onSubmit={leaveRoomHandler}>
      <TextField value={leaveroomName} onChange={(e)=>{setLeaveRoomName(e.target.value)}} id="outlined-basic" label="LEAVE Room Name" variant="outlined"></TextField>
      <Button type="submit" variant="contained" color="primary" >LEAVE</Button>
      </form>
      <Stack>
        {messageLIST.map((msg,id)=>{
          return (
            <Typography variant="h8" key={id} component="div" gutterBottom>
               {msg}
            </Typography>
          )
        })}
      </Stack>
     </Container>
     )
}
export default App
