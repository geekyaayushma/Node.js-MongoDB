const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function updateAllListingsToHavePropertyType(client) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateMany(
      { property_type: { $exists: false } },
      { $set: { property_type: "Unknown" } }
    );
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function main(client) {
  try {
    await client.connect();
    console.log("Connected to database");

    await updateAllListingsToHavePropertyType(client);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

main(client).catch(console.error);
