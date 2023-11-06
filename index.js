import express from "express";
import dotenv from "dotenv";
import mongoDBConnection from "./MongoDB/connection.js";
import router from "./Routes/web.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoDBConnection();
});
