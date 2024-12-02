import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import anime from "./Routes/anime.js";

dotenv.config();
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected To Database"));

const app = express();

app.use(express.json());
app.use("/anime", anime);

app.listen(4000, () => {
  console.log(`App running on 4000`);
});
