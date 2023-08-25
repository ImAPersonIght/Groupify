const express = require('express')
const router = express.Router()
const dal = require('../data/groupify.mongo.js') 
const table = 'user'

const getUserByToken = (req, res) => {
    const token = req.params.account_token
    console.log(token)
    try {
        dal.GetUserByIdentifier((jsonData) => {
            if (jsonData) {
                res.json(jsonData)
            } else {
                res.sendStatus(404)
            }
        }, "account_token", parseInt(token), table)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const getUserByEmail = (req, res)=>{
    const email = req.params.email
    try {
        dal.GetUserByIdentifier((jsonData) => {
            if (jsonData) {
                res.json(jsonData)
            } else {
                res.sendStatus(404)
            }
        }, "email", email, table)
    } catch (err) {
        res.sendStatus(500)
    }
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

const patch = (req, res)=>{
    try{
        dal.PatchUser(()=>{

        })
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

const addRoom = (req, res)=>{
    const newRoomData = req.body
    try{
        dal.AddRoom(()=>{
            res.sendStatus(200)
        }, newRoomData.room, newRoomData.user_token ,table)
    }
    catch(err){
        res.sendStatus(500)
    }
}

router.get('/email/:email', getUserByEmail)
router.get('/token/:account_token', getUserByToken)
router.post('/', post)
router.patch('/', patch)
router.patch('/addRoom', addRoom)
router.use(express.json())
module.exports = router