import express from "express"
import { verifyToken } from "../middleware/jwt.js"
import { createReview, deleteReview, getReviews } from "../controller/reviews.controller.js"

const router = express.Router()

router.post("/create",verifyToken,createReview)
router.get("/get/:id",getReviews)
router.delete("/delete/:id",deleteReview)

export default router