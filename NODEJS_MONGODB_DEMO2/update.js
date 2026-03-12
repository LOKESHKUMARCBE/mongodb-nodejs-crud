const connectDB = require("./db");

async function updateData() {
    const db = await connectDB();
    const collection = db.collection("students");

    const result = await collection.updateOne(
        { name: "Ravi" },
        { $set: { age: 45 } }
    );

    console.log("Documents Updated:", result.modifiedCount);
}

updateData();