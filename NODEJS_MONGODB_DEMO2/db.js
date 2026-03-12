const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function connectDB() {
    await client.connect();
    const db = client.db("mydb");
    return db;
}

module.exports = connectDB;