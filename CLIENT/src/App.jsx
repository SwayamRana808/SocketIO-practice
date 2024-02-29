 import {io} from "socket.io-client"
 import { useEffect,useState,useMemo } from "react"
 import { Button, Container, TextField, Typography } from "@mui/material"
const App=()=>{
  const [message,setMessage]=useState("")
  useEffect(()=>{
    socket.on("connect",()=>{  // event triggers when connection is made 
        console.log("connected...",socket.id)   
    })
    socket.on("welcomeEVENT",(datafromserver)=>{
      console.log(datafromserver)
    })
    socket.on("receive-msg",(data_msg)=>{
      console.log(data_msg)
    })

    return ()=>{
        socket.disconnect();
    }
     
    
  },[])
  const socket=useMemo(()=>io("http://localhost:3000"),[]) //useMemo is used so it dont create new socket after message being sent
  const handleSubmit=(e)=>{
      e.preventDefault()
      socket.emit("message",message)

  }
  return (
     <Container maxWidth="sm">
      <Typography variant="h3" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField value={message} onChange={(e)=>{setMessage(e.target.value)}} id="outlined-basic" label="Outlined" variant="outlined"></TextField>
        <Button type="submit" variant="contained" color="primary" >Send</Button>
      </form>
     </Container>
     )
}
export default App
