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

const postData = (data, table, callback)=>{
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

module.exports = {
    GetUserByIdentifier:getUserByIdentifier,
    Post: postData
}