const connectDB = require("./db");

async function readData() {
    const db = await connectDB();
    const collection = db.collection("students");

    const data = await collection.find().toArray();
    console.log(data);
}

readData();