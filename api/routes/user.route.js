import express from "express"
import { getSingleUser, userDelete } from "../controller/user.controller.js"
import { verifyToken } from "../middleware/jwt.js"

const router = express.Router()

router.delete("/delete/:id",verifyToken,userDelete)
router.get("/getUser/:id",verifyToken,getSingleUser)

export default router