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

app.get('/userportal', (req, res) => {
    res.sendFile(path.resolve(".\\front\\createUser.html"))
})

app.get('/home', (req, res)=>{
    res.sendFile(path.resolve(".\\front\\messages.html"));
})

app.get('/home/profile', (req, res)=>{
    res.sendFile(path.resolve(".\\front\\profile.html"))
})

app.get('/', (req, res)=>{
    res.send('This is the Groupify api')
})  

app.post('/home/auth', authenticateToken, (req, res) => {
    res.sendStatus(200)
})

app.post('/decode', authenticateToken, (req, res)=>{
    res.json(req.user)
})

app.post('/login', (req, res)=>{
    const user_id = req.body.account_token
    console.log(user_id)
    const user = {user: user_id}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json(accessToken)
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        res.sendStatus(401)
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user, decode) => {
            if (err) {
                res.sendStatus(403)
            } else {
                req.user = user
                next()
            }
        })
    }
}

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