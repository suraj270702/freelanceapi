import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
const app = express();
dotenv.config()

const db = async()=>{
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(
          process.env.MONGO_URL
        );
        console.log("Database Connected");
      } catch (error) {
        console.log(error);
      }
}

app.listen(8080, () => {
    db()
  console.log("Server is running on port 8080");
});
