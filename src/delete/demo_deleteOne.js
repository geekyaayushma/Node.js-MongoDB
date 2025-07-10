const { MongoClient } = require("mongodb");

const url = "mongodb://Localhost:27017";
const client = new MongoClient(url);

async function deleteListingByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .deleteOne({ name: nameOfListing });
}

async function main(client, nameOfListing) {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    await deleteListingByName(client, "Updated Infinite Views");
  } catch (err) {
    console.error("Error occured:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

main(client, "Updated Infinite Views").catch(console.error);
