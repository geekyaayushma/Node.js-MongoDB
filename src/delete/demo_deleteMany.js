const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function deleteListingsWithMinimumBedroomsAndMostRecentReviews(
  client,
  { minimumBedrooms = 0, maximumBathrooms = 2 }
) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .deleteMany({
      bedrooms: { $gte: minimumBedrooms },
      bathrooms: { $lte: maximumBathrooms },
    });

  console.log(`${result.deletedCount} listing(s) were deleted.`);
}

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    await deleteListingsWithMinimumBedroomsAndMostRecentReviews(client, {
      minimumBedrooms: 1,
      maximumBathrooms: 2,
    });

    console.log("Listings deleted successfully");
  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

main().catch(console.error);
