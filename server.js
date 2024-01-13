const express=require('express')
const http=require('http')
const path=require('path')
const cors=require('cors')
const {Server}=require('socket.io')
const app=express()
const server=http.createServer(app)
// app.use(express.static(path.resolve("./public")))
app.use(cors())
const io=new Server(server)
app.get('/',async(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})

io.on('connection',(socket)=>{
    console.log('user con',socket.id)
    socket.on('msges',(msg)=>{
        console.log(msg)
        io.emit('message',msg)
    })
})

server.listen(3000,()=>console.log("app runiing"))
