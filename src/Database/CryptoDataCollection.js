import connectToMongoDB from "./MongoDbClient.js";

export async function createCryptoData(cryptoData){
    const cryptoDataCollection = await connectToMongoDB("crypto_data_collection")
    await cryptoDataCollection.insertOne(cryptoData)
}