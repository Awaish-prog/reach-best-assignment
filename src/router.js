import express from "express";
import { config } from "dotenv";
import { getCryptoCurrencies, getCryptoData } from "./Controller/scrapperDbController.js";
config();

const router = express.Router();

router.post("/getCryptoData", getCryptoData)
router.get("/getAvailableCryptoCurrencies", getCryptoCurrencies)

export default router;