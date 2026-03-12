const { MongoClient } = require("mongodb");
// connection URL
const url = "mongodb://localhost:27017";

// database name
const dbName = "mydb";

async function connectDB() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("MongoDB Connected Successfully");

        const db = client.db(dbName);

        // access collection
        const collection = db.collection("students1");

        // insert sample data
        const result = await collection.insertOne({
            name: "RAJKUMAR",
            age: 51,
            course: "it"
        });

        console.log("Document inserted:", result.insertedId);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

connectDB();