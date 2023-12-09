import connectToMongoDB from "./MongoDbClient.js";

export async function createCryptoDataDb(cryptoData){
    const cryptoDataCollection = await connectToMongoDB("crypto_data_collection")
    await cryptoDataCollection.insertOne(cryptoData)
}

export async function getCryptoDataDb(dateRanges, cryptoCurrencies){
    const cryptoDataCollection = await connectToMongoDB("crypto_data_collection")
    const query = {
        $or: dateRanges.map((dateRange) => {
            return {
                createdAt: {
                  $gte: dateRange.startDate,
                  $lte: dateRange.endDate,
                },
            }
        }),
    };

    const projection = {};
    cryptoCurrencies.forEach((cryptoCurrency) => {
        projection[cryptoCurrency] = 1;
    });

    return await cryptoDataCollection.find(query, { projection }).toArray();
}