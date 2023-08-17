const express = require('express')
const router = express.Router()
const dal = require('../data/groupify.mongo.js') 
const { put } = require('./user.js')
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

const getMessageByRoomid = (req, res)=>{
    const roomid = req.params.roomid
    try{
        dal.getMessageByRoomid((data)=>{
            res.json(data)
        }, table, roomid)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

router.post('/', post)
router.get('/:roomid', getMessageByRoomid)
router.use(express.json())
module.exports = router