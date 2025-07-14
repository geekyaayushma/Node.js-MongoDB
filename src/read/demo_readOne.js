const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Function to find one listing by name
async function findOneListingByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .findOne({ property_type: nameOfListing });

  if (result) {
    console.log(` Found a listing with the name '${nameOfListing}':`);
    console.log(result);
  } else {
    console.log(` No listings found with the name '${nameOfListing}'`);
  }
}

// Main function
async function main() {
  try {
    await client.connect();
    console.log(" Connected to MongoDB");

    // Search for the listing
    await findOneListingByName(client, "Apartment");
  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    await client.close();
    console.log(" Connection closed");
  }
}

main().catch(console.error);
