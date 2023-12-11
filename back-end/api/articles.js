const { MongoClient } = require('mongodb');
const data = require('./data/data.json');

const uri = 'mongodb+srv://airwatch-admin:dcd-c523-ps066@airwatchid-cluster.mm2cm9g.mongodb.net/AirwatchID-Articles';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  await client.connect();
  console.log('Connected to MongoDB');

  const database = client.db('AirwatchID-Articles');
  const collection = database.collection('Articles');

  return collection.find({}).toArray();
}

module.exports = connectToDatabase()
  .then((result) => {
    const articles_db = result;
    console.log('Articles data loaded successfully.');
    return articles_db;
  })
  .catch((error) => {
    console.error('Error loading articles data:', error);
    throw error;
  });
