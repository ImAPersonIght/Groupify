const express = require('express')
const router = express.Router()
const dal = require('../data/groupify.mongo.js') 
const { put } = require('./user.js')
const table = 'room' 

const post = (req, res)=>{
    const data = req.body
}