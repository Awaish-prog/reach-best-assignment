import cors from "cors";
import express from "express";
import router from "./router.js";
import { scrapeCoinMarketCap } from "./Scrapper/scrapper.js";

const app = express()
app.use(cors())
app.use(router)

app.listen("4040", () => {
    scrapeCoinMarketCap()
    console.log("Server is running at port 4040...");
})