const {MongoClient} = require('mongodb')
const url = "mongodb://localhost:2717"

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

const postUser = (data, table, callback)=>{
    executeQuery(async (client) => {
        const database = client.db(table)
        const collection = database.collection(table + 's')
        await collection.insertOne(data)
        callback()
    })
}

const getUserByIdentifier = async (callback, identifier, identifierData, table)=>{
    executeQuery(async (client)=>{
        const database = client.db(table)
        const collection = database.collection(table + 's')
        const query = {identifier: identifierData}
        let data = await collection.findOne(query)
        callback(data)
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
    PostUser: postUser,
    Update: updateUser
}