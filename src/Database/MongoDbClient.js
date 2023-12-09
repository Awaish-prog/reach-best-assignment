const { MongoClient } = require("mongodb");

const mongoURL = process.env.MONGO_DB_CONNECTION_STRING

async function connectToMongoDB(collectionString) {
    const mongoClient = new MongoClient(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await mongoClient.connect();
    const collection = mongoClient
        .db("crypto_db")
        .collection(collectionString);

    return collection
}

export default connectToMongoDB
