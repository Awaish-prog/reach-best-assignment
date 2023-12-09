import { createCryptoData } from "../Database/CryptoDataCollection.js";
import { scrapCryptoData } from "../Scrapper/scrapper.js";

export async function scrapperDbController(){
    const scrapperData = await scrapCryptoData()
    const cryptoDataDb = { }
    scrapperData.forEach((cryptoData) => {
        cryptoDataDb[cryptoData[2]] = {
            price: cryptoData[3],
            marketCap: cryptoData[7]
        }
    })
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    cryptoDataDb.createdAt = `${year}-${month}-${day}`
    await createCryptoData(cryptoDataDb)
    console.log("Data created...");
}