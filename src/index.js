import cors from "cors";
import express from "express";
import router from "./router.js";
import bodyParser from "body-parser";
import { createCryptoData } from "./Controller/scrapperDbController.js";
import schedule from 'node-schedule'

const app = express()
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(router)

schedule.scheduleJob('0 0 * * *', () => {
    createCryptoData()
})

app.listen("4040", () => {
    console.log("Server is running at port 4040...");
})