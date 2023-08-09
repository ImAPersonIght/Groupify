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
        dal.Post(data, table)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500).json({error: err})
    }
}

router.get('/', get)
router.post('/', post)
module.exports = router