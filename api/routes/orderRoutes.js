const express = require("express")
const { createOrder } = require("../controllers/orderControllers")
const { protectedRoutes } = require("../controllers/authControllers")

const router = express.Router()

router.post("/",protectedRoutes,createOrder)

module.exports = router