const {MongoClient} = require('mongodb')
const url = "mongodb://localhost:2717"

const executeQuery = async (query, res) => {
    const client = new MongoClient(url)
    try {
        await query(client)
    } catch (err) {
        console.log(err)
        //res.status(500).json({ error: err })
    } finally {
        await client.close()
    }
};

const postData = (data, table, res) => {
    executeQuery(async (client) => {
        const database = client.db(table);
        const collection = database.collection(table + 's')
        await collection.insertOne(data);
        //res.sendStatus(200);
    }, res)
}

module.exports = {
    Post: postData
}