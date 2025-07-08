const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

//Upsert is a combination of update and insert.
// If the document exists, it updates it. If it doesn't exist, it inserts a new
async function upsertListinByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingAndReviews")
    .updateOne(
      { name: nameOfListing },
      { $set: updatedListing },
      { upsert: true }
    );
  console.log(`${result.matchedCount} documents matched the query criteria.`);
  if (result.upsertedCount > 0) {
    console.log(
      `A new listing was inserted with the id: ${result.upsertedId._id}`
    );
  } else {
    console.log(`${result.modifiedCount} documents were updated.`);
  }
}

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    await upsertListinByName(client, "Infinite Views", {
      name: "Updated Infinite Views",
      bedrooms: 3,
      bathrooms: 2,
      amenities: ["WiFi", "Kitchen", "Free Parking"],
      last_review: new Date("2023-10-01"),
    });
  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}
main().catch(console.error);
