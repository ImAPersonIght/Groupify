const express = require('express')
const router = express.Router()
const dal = require('../data/groupify.mongo.js') 
const table = 'message'

const post = (req, res)=>{
    const data = req.body
    try{
        dal.Post(data, table, res)
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500).json({error: err})
    }
}

router.post('/', post)
module.exports = router