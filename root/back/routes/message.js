const express = require('express')
const router = express.Router()
const dal = require('../data/groupify.mongo.js') 
const table = 'message'

const post = (req, res)=>{
    const data = req.body
    try{
        dal.PostUser(data, table, ()=>{
            res.sendStatus(201)
        })
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

router.post('/', post)
router.use(express.json())
module.exports = router