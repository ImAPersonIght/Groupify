const express = require('express')
const app = express()
const port = 2718

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('This is the Groupify api')
})  

const userRoute = require("./routes/user.js")  
app.use('/user', userRoute)

const messageRoute = require("./routes/message.js")
app.use('/message', messageRoute)

app.listen(port, ()=>{
    console.log('API service listening at localhost:2718')
})