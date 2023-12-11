const { MongoClient } = require('mongodb');
require('dotenv/config');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('AirwatchID-Articles');
    const collection = database.collection('Articles');

    console.log('Data Retrieved');

    return collection;
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
};

module.exports = { connectToDatabase };

// .then((result) => {
//     const articles_db = result;
//     console.log('Articles data loaded successfully.');
//     return articles_db;
//   })
//   .catch((error) => {
//     console.error('Error loading articles data:', error);
//     throw error;
//   });
