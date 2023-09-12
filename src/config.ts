import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.lytkt.mongodb.net/Ettis-cookies`
const JWT_KEY = process.env.JWT_KEY || "";

const PORT = process.env.PORT || 3001;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: PORT,
        jwtKey:JWT_KEY
    }
}