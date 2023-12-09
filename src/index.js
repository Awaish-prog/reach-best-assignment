import cors from "cors";
import express from "express";
import router from "./router.js";
import { scrapperDbController } from "./Controller/scrapperDbController.js";

const app = express()
app.use(cors())
app.use(router)

app.listen("4040", () => {
    scrapperDbController()
    console.log("Server is running at port 4040...");
})