import express from 'express'
import { createServer } from 'node:http'
import { Server as SocketIoServer } from 'socket.io'
import cors from 'cors'
const app = express()
const server = createServer(app)
app.use(cors())
const io = new SocketIoServer(server,{
  cors: { origin:"*" }
});
app.get('/', (req,res) => {
  res.send('Hello Express!')
})
let numberOfUsers = 0;
io.on("connection",(socket) => {
  ++numberOfUsers;
  socket.on("sendUsername",(username) => {
    socket.broadcast.emit("reciveMessage",{
      username:"BOT",
      message:`${username} has joined the chatroad!`
    })
    socket.on("sendMessage", (message) => {
      socket.broadcast.emit("reciveMessage",{
        message,
        username,
        timestamp: Date.now()
      });
    });
  })
  socket.on("disconnect", () => { 
      --numberOfUsers
      socket.on("sendUsername",(username) => {
        socket.broadcast.emit("reciveMessage",{
          username:"BOT",
          message: `${username} has left the chatroad!`,
          timestamp: Date.now()
        })
      })
    })
});

server.listen(3456,() => {
  console.log("App is listening!")
})