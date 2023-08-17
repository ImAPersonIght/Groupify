require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const cors = require('cors');  
const path = require('path')
const backendPort = 2718
const frontendPort = 8080

app.use(express.json())

app.use(cors({ origin: `http://localhost:${frontendPort}` }));

app.use(express.static('./front'))

app.get('/createuser', (req, res) => {
    res.sendFile(path.resolve(".\\front\\createUser.html"))
})

app.get('/home', (req, res)=>{
    res.sendFile(path.resolve(".\\front\\messages.html"))
})

app.get('/home/profile', (req, res)=>{
    res.sendFile(path.resolve(".\\front\\profile.html"))
})

app.get('/', (req, res)=>{
    res.send('This is the Groupify api')
})  

const userRoute = require("./back/routes/user.js")  
app.use('/user', userRoute)

const messageRoute = require("./back/routes/message.js")
app.use('/message', messageRoute)

const roomRoute = require("./back/routes/room.js")
app.use('/room', roomRoute)

app.listen(backendPort, ()=>{
    console.log('API service listening at localhost:2718')
})

app.listen(frontendPort, ()=>{
    
})