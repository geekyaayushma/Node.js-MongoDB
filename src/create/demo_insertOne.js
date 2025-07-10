const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect(); // Connect to MongoDB
    console.log(" Connected to MongoDB");

    const db = client.db("mydb"); // Use or create 'mydb' database
    const collection = db.collection("customers"); // Use or create 'customers' collection

    const myData = { name: "Aayushma", address: "Harion" };

    const result = await collection.insertOne(myData);
    console.log(" Document inserted:", result.insertedId);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close(); // Always close the connection
  }
}

run();
