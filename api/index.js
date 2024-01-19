import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoute from "../api/routes/user.route.js"
import authenticationRoute from "../api/routes/authentication.route.js"
import gigRoute from '../api/routes/gig.route.js'
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
dotenv.config()


//Database Connection
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


//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).send(errorMessage)
})



//Routes
app.use("/api/users",userRoute)
app.use("/api/authentication",authenticationRoute)
app.use("/api/gigs",gigRoute)

app.listen(8080, () => {
    db()
  console.log("Server is running on port 8080");
});
