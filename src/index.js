import cors from "cors";
import express from "express";
import router from "./router.js";
import { getCryptoData } from "./Controller/scrapperDbController.js";

const app = express()
app.use(cors())
app.use(router)

app.listen("4040", () => {
    const req = {
        body: {
            dateRanges: [
                {
                    startDate: "2023-12-10",
                    endDate: "2023-12-13"
                },
                {
                    startDate: "2023-11-09",
                    endDate: "2023-11-28"
                },
                {
                    startDate: "2023-10-15",
                    endDate: "2023-10-29"
                },
            ],
            cryptoCurrencies: ["BitcoinBTC", "EthereumETH", "Tether USDtUSDT", "Shiba InuSHIB", "Trust Wallet TokenTWT", "ZcashZEC", "createdAt"]
        }
    }
     
    getCryptoData(req, null)
    console.log("Server is running at port 4040...");
})