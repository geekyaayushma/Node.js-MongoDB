const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";

MongoClient.connect(url, function (err, client) {
  if (err) throw err;

  const db = client.db("mydb");
  const myobj = { name: "Aayushma", address: "Harion" };

  db.collection("customers").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log("✅ 1 document inserted:", res.insertedId);
    client.close();
  });
});
