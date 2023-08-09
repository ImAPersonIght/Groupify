const {MongoClient} = require('mongodb')
const url = "mongodb://localhost:2717"

const executeQuery = async (query) => {
    const client = new MongoClient(url)
    try {
        await query(client)
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
};

const postData = (data, table) => {
    executeQuery(async (client) => {
        try{
            const database = client.db(table)
            const collection = database.collection(table + 's')
            await collection.insertOne(data)
        }
        catch(err){
            console.log(err)
        }
    })
}

module.exports = {
    Post: postData
}