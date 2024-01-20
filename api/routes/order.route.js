import express from "express"
import { createOrder, getOrders } from "../controller/order.controller.js"
import { verifyToken } from "../middleware/jwt.js"

const router = express.Router()

router.post("/create/:id",verifyToken,createOrder)
router.get("/get",verifyToken,getOrders)

export default router