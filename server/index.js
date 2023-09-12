import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import multer from "multer"
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";

import { error } from "console";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import { register } from "./controllers/auth.js";

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
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

/*  ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture", register));

/* ROUTES */
app.use("/auth", authRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
    })
    .catch((error) => console.log(`Failed to connect to database \n Error: \n ${error}`));