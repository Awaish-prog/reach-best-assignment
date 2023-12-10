import { MongoClient } from "mongodb";

async function connectToMongoDB(collectionString) {
    const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING, {
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
