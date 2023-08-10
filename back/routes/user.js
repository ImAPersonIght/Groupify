const express = require('express')
const router = express.Router()
const dal = require('../data/groupify.mongo.js') 
const table = 'user'

const get = (req, res)=>{
    res.send("This is the user section")
}

const post = (req, res)=>{
    const data = req.body
    try{
        dal.Post(data, table, () => {
            res.sendStatus(201)
        })
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

router.get('/', get)
router.post('/', post)
router.use(express.json())
module.exports = router