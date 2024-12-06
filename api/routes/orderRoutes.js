const express = require("express")
const { createOrder, getOrderById, getAllOrderByMe, getAllOrders, updateOrderStatus, updateDefaultDeliveryPrice } = require("../controllers/orderControllers")
const { protectedRoutes, isAdmin } = require("../controllers/authControllers")

const router = express.Router()

router.post("/", protectedRoutes, createOrder)
router.get("/",protectedRoutes,isAdmin ,getAllOrders)
router.get("/order-by-me",protectedRoutes,getAllOrderByMe)
router.post("/update-status",protectedRoutes,isAdmin,updateOrderStatus)
router.post("/change-delivery-price",protectedRoutes,isAdmin,updateDefaultDeliveryPrice)
router.get("/:id",protectedRoutes, getOrderById)
module.exports = router