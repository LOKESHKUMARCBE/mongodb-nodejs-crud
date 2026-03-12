const connectDB = require("./db");

async function deleteData() {
    const db = await connectDB();
    const collection = db.collection("students");

    const result = await collection.deleteOne({ name: "Ravi" });

    console.log("Documents Deleted:", result.deletedCount);
}

deleteData();