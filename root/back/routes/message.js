const express = require('express')
const router = express.Router()
const dal = require('../data/groupify.mongo.js') 
const table = 'message'

const post = (req, res)=>{
    const data = req.body
    try{
        dal.Post(data, table, ()=>{
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
        dal.GetMessageByRoomid((data)=>{
            console.log(data)
            res.json(data)
        }, table, roomid)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

const getMessageById = (req, res)=>{
    const messageid = req.params.messageid
    try{
        dal.getMessageById((data)=>{
            res.json(data)
        }, table, messageid)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

router.post('/', post)
router.get('/:roomid', getMessageByRoomid)
router.get('/id/:messageid', getMessageById)
router.use(express.json())
module.exports = router