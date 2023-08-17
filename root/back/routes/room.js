const express = require('express')
const router = express.Router()
const dal = require('../data/groupify.mongo.js') 
const { put } = require('./user.js')
const table = 'room' 

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

const getRoomById = (req, res)=>{
    const id = req.params.id
    try{
        dal.GetRoomByRoomid((room)=>{
            res.json(room)
        }, table, id)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

router.post('/', post)
router.get('/:id', getRoomById)
router.use(express.json())
module.exports = router