import express from "express"
import { verifyToken } from "../middleware/jwt.js";
import { createGig, deleteGig, getAllGigs, getSingleGig } from "../controller/gig.controller.js";
const router = express.Router();


router.post("/create",verifyToken,createGig)
router.get("/get/:id",verifyToken,getSingleGig)
router.get("/getall",verifyToken,getAllGigs)
router.delete("/delete/:id",verifyToken,deleteGig)



export default router