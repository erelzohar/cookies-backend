import {config} from "./config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import expressRateLimit from "express-rate-limit";
import expressFileUpload from "express-fileupload";
import productsController from "./controllers/products-controller";
import authController from "./controllers/auth-controller";

const app = express();

app.use(express.json())
app.use(expressFileUpload())
app.use(cors({origin:"*"}));

app.use("/", expressRateLimit({
    windowMs: 1000, // 1 second
    max: 20, // limit each IP to 5 requests per windowMs
    message: "Are You a Hacker?" 
}));


app.get("/", (req: Request, res: Response) => {
    res.json("TSNODE");
});

app.use("/api/products",productsController);
app.use("/api/auth",authController);


mongoose.set("debug",true)
mongoose.connect(config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
        console.log("connected to mongo");
        app.listen(config.server.port, () => {
            console.log(`listening to port ${config.server.port}`);
        })
    })
    .catch((err) => {
        console.log(err);
        throw new Error("mongo connection failed");
    })
