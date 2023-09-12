import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import multer from "multer"
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

/* CONFIGURATIONS */
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const upload = multer({ storage });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
