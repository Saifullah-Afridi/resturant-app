const { SignUp, logIn } = require("../controllers/authControllers")

const express = require("express")

const router = express.Router()

router.post("/sign-up", SignUp)

router.post("/log-in",logIn)

module.exports = router