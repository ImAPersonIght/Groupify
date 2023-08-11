    const express = require('express')
    const app = express()
    const cors = require('cors');  
    const path = require('path')
    const backendPort = 2718
    const frontendPort = 8080

    app.use(express.json())

    app.use(cors({ origin: `http://localhost:${frontendPort}` }));

    app.use(express.static('./front'))

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'front', 'createUser.html'));
    })

    app.get('/', (req, res)=>{
        res.send('This is the Groupify api')
    })  

    const userRoute = require("./back/routes/user.js")  
    app.use('/user', userRoute)

    const messageRoute = require("./back/routes/message.js")
    app.use('/message', messageRoute)

    app.listen(backendPort, ()=>{
        console.log('API service listening at localhost:2718')
    })