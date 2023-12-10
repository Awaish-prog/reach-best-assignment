import { createCryptoDataDb, getCryptoCurrenciesDb, getCryptoDataDb } from "../Database/CryptoDataCollection.js";
import { dollarStringToNumber } from "../Helpers/ConvertDollarStringToNumber.js";
import { scrapCryptoData } from "../Scrapper/scrapper.js";

export async function createCryptoData(){
    try{
        const scrapperData = await scrapCryptoData();
        const cryptoDataDb = { };
        scrapperData.forEach((cryptoData) => {
            cryptoDataDb[cryptoData[2]] = {
                price: cryptoData[3],
                marketCap: cryptoData[7]
            }
        });
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        cryptoDataDb.createdAt = `${year}-${month}-${day}`;
        await createCryptoDataDb(cryptoDataDb);
        console.log("Data created...");
    }
    catch(e){
        console.log(e);
    }
}

export async function getCryptoData(req, res){
    try{
        const { dateRanges, cryptoCurrencies } = req.body;
        cryptoCurrencies.push("createdAt")
        const cryptoDataDb = await getCryptoDataDb(dateRanges, cryptoCurrencies);
        const cryptoCurrenciesMarketCaps = { };
    
        cryptoDataDb.forEach((cryptoData) => {
            const cryptoDataKeys = Object.keys(cryptoData)
            cryptoDataKeys.forEach((cryptoDataKey) => {
                if(cryptoDataKey == "_id" || cryptoDataKey == "createdAt"){
                    return;
                }
                dateRanges.forEach((dateRange) => {
                    if(dateRange.startDate <= cryptoData.createdAt && dateRange.endDate >= cryptoData.createdAt){

                        if(cryptoCurrenciesMarketCaps[`${cryptoDataKey},${dateRange.startDate},${dateRange.endDate}`]){
                            cryptoCurrenciesMarketCaps[`${cryptoDataKey},${dateRange.startDate},${dateRange.endDate}`].push({price: dollarStringToNumber(cryptoData[cryptoDataKey].price), marketCap: dollarStringToNumber(cryptoData[cryptoDataKey].marketCap)})
                        }
                        else{
                            cryptoCurrenciesMarketCaps[`${cryptoDataKey},${dateRange.startDate},${dateRange.endDate}`] = [{price: dollarStringToNumber(cryptoData[cryptoDataKey].price), marketCap: dollarStringToNumber(cryptoData[cryptoDataKey].marketCap)}]
                        }
                
                    }   
                })
            })
        })

        const cryptoDataDbKeys = Object.keys(cryptoCurrenciesMarketCaps)
        const aggregatedCryptoData = { }
        for(let i = 0; i < cryptoDataDbKeys.length; i++){
            for(let j = 0; j < cryptoCurrenciesMarketCaps[cryptoDataDbKeys[i]].length; j++){
                if(aggregatedCryptoData[cryptoDataDbKeys[i]]){
                aggregatedCryptoData[cryptoDataDbKeys[i]].avgPrice += cryptoCurrenciesMarketCaps[cryptoDataDbKeys[i]][j].price;
                    aggregatedCryptoData[cryptoDataDbKeys[i]].avgMarketCap += cryptoCurrenciesMarketCaps[cryptoDataDbKeys[i]][j].marketCap;
                    aggregatedCryptoData[cryptoDataDbKeys[i]].maxPrice = cryptoCurrenciesMarketCaps[cryptoDataDbKeys[i]][j].price > aggregatedCryptoData[cryptoDataDbKeys[i]].maxPrice ? cryptoCurrenciesMarketCaps[cryptoDataDbKeys[i]][j].price : aggregatedCryptoData[cryptoDataDbKeys[i]].maxPrice;
                    aggregatedCryptoData[cryptoDataDbKeys[i]].maxMarketCap = cryptoCurrenciesMarketCaps[cryptoDataDbKeys[i]][j].marketCap > aggregatedCryptoData[cryptoDataDbKeys[i]].maxMarketCap ? cryptoCurrenciesMarketCaps[cryptoDataDbKeys[i]][j].marketCap : aggregatedCryptoData[cryptoDataDbKeys[i]].maxMarketCap;
                }
                else{
                    aggregatedCryptoData[cryptoDataDbKeys[i]] = {
                        avgPrice: cryptoCurrenciesMarketCaps[cryptoDataDbKeys[i]][j].price,
                        avgMarketCap: cryptoCurrenciesMarketCaps[cryptoDataDbKeys[i]][j].marketCap,
                        name: cryptoDataDbKeys[i].split(',')[0],
                        maxPrice: cryptoCurrenciesMarketCaps[cryptoDataDbKeys[i]][j].price,
                        maxMarketCap: cryptoCurrenciesMarketCaps[cryptoDataDbKeys[i]][j].marketCap
                    }
                }
            }
            aggregatedCryptoData[cryptoDataDbKeys[i]].avgPrice /= cryptoCurrenciesMarketCaps[cryptoDataDbKeys[i]].length
            aggregatedCryptoData[cryptoDataDbKeys[i]].avgMarketCap /= cryptoCurrenciesMarketCaps[cryptoDataDbKeys[i]].length   
        }
        const aggregatedCryptoDataKeys = Object.keys(aggregatedCryptoData)
        const cryptoTableData = { }

        for(let i = 0; i < aggregatedCryptoDataKeys.length; i++){
            const dates = aggregatedCryptoDataKeys[i].split(',')
            const key = `From ${dates[1]} to ${dates[2]}`
            if(cryptoTableData[key]){
                cryptoTableData[key].push(aggregatedCryptoData[aggregatedCryptoDataKeys[i]])
            }
            else{
                cryptoTableData[key] = [aggregatedCryptoData[aggregatedCryptoDataKeys[i]]]
            }
        }
        res.status(200).json({status: 200, cryptoTableData})
    }
    catch(e){
        res.status(500)
    }
    
}

export async function getCryptoCurrencies(req, res){
    const cryptoCurrencies = (await getCryptoCurrenciesDb()).filter(cryptoCurrency => cryptoCurrency != "_id" && cryptoCurrency != "createdAt")
    res.status(200).json({ cryptoCurrencies })
}