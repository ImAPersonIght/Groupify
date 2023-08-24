const e = require('express')
const {MongoClient} = require('mongodb')
const url = "mongodb://localhost:2717"

//opens a client and executes query on data
//@param query - Database query instructions
const executeQuery = async (query)=>{
    const client = new MongoClient(url)
    try {
        await query(client)
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
}

//post a user to the database
//@param data - the data that will get posted
//@param table - the table that the data will be posted to
//@param callback - callback code that will be ran after the data is posted
const postData = (data, table, callback)=>{
    executeQuery(async (client) => {
        const database = client.db(table)
        const collection = database.collection(table + 's')
        await collection.insertOne(data)
        callback()
    })
}

//gets a user by an identerfier 
//@param identifer - the ideftifier for what    
const getUserByIdentifier = async ( callback, identifier, identifierData, table)=>{
    executeQuery(async (client)=>{
        const database = client.db(table)
        const collection = database.collection(table + 's')
        const query = {[identifier]: identifierData}
        let data = await collection.findOne(query)
        callback(data)
    })
}


const getMessageByRoomid = async (callback, table, id)=>{
    executeQuery(async (client)=>{
        const database = client.db(table)
        const collection = database.collection(table + "s")
        const query = {roomid: parseInt(id)}
        const messages = await collection.find(query).toArray()
        callback(messages)
    })
}

const getMessageById = async (callback, table, id)=>{
    executeQuery(async (client)=>{
        const database = client.db(table)
        const collection = database.collection(table + "s")
        const query = {message_id: parseInt(id)}
        const message = await collection.findOne(query)
        callback(message)
    })
}

const getRoomById = async (callback, table, id)=>{
    executeQuery(async (client)=>{
        const database = client.db(table)
        const collection = database.collection(table + "s")
        const query = {roomid: parseInt(id)}
        const room = await collection.findOne(query)
        callback(room)
    })
}

const getRoomByName = async (callback, table, name)=>{
    executeQuery(async (client)=>{
        const database = client.db(table)
        const collection = database.collection(table + "s")
        const query = {roomname: name}
        const room = await collection.find(query).toArray()
        callback(room)
    })
}

const updateUser = (callback, table, userToken, change, changeData)=>{
    executeQuery(async (client)=>{
        const database = client.db(table)
        const collection = database.collection(table + 's')
        const query = {account_token:userToken}
        const update = {
            $set:{
                change:changeData
            }
        }
        await collection.findOneAndUpdate(query, update)
        callback()
    })
}

module.exports = {
    GetUserByIdentifier:getUserByIdentifier,
    GetMessageByRoomid:getMessageByRoomid,
    getMessageById:getMessageById,
    GetRoomByRoomid:getRoomById,
    GetRoomByName: getRoomByName,
    Post:postData,
    Update:updateUser
}