const express = require('express')
const router = express.Router()
const dal = require('../data/groupify.mongo.js') 
const table = 'user'

function getUserByIdentifier(identifier, res, req) {
    const userIdentifier = req.params[identifier]
    console.log(userIdentifier)
    try {
        dal.GetUserByIdentifier((jsonData) => {
            if (jsonData) {
                res.json(jsonData)
            } else {
                res.sendStatus(404)
            }
        }, identifier, userIdentifier, table);
    } catch (err) {
        res.sendStatus(500);
    }
}

const getUserByToken = (req, res) => {
    getUserByIdentifier('token', res, req);
}

const getUserByUsername = (req, res)=>{ //this is bugged
    getUserByIdentifier('username', res, req)
}

const post = (req, res)=>{
    const data = req.body
    try{
        dal.PostUser(data, table, () => {
            res.sendStatus(201).send("User Poster Succsessfully")
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

router.get('/username/:username', getUserByUsername)
router.get('/token/:account_token', getUserByToken)
router.post('/', post)
router.patch('/', post)
router.use(express.json())
module.exports = router