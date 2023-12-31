const express = require('express')
const router = express.Router()
const dal = require('../data/groupify.mongo.js') 
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
            if(room){
                res.json(room)
            }
            else{
                res.sendStatus(404)
            }
        }, table, id)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

const getRoomByName = (req, res)=>{
    const name = req.params.name
    try{
        dal.GetRoomByName((room)=>{
            if(room){
                res.json(room)
            }
            else{
                res.sendStatus(404)
            }
        }, table, name)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

router.post('/', post)
router.get('/name/:name', getRoomByName)
router.get('/:id', getRoomById)
router.use(express.json())
module.exports = router