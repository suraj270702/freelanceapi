import express from "express"
import { userDelete } from "../controller/user.controller.js"
import { verifyToken } from "../middleware/jwt.js"

const router = express.Router()

router.delete("/delete/:id",verifyToken,userDelete)

export default router