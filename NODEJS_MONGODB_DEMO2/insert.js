const connectDB = require("./db");

async function insertData() {
    const db = await connectDB();
    const collection = db.collection("students");

    const result = await collection.insertOne({
        name: "Ravi",
        age: 21,
        course: "IT"
    });

    console.log("Inserted ID:", result.insertedId);
}

insertData();