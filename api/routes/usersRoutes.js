const { SignUp, logIn, logOut, protectedRoutes, isAdmin, checkingAdminController } = require("../controllers/authControllers")

const express = require("express")
const { getAllUser, getSingleUser, deleteUser, updateUser } = require("../controllers/userControllers")

const router = express.Router()

router.post("/sign-up", SignUp)

//auth routes
router.post("/log-in",logIn)
router.post("/log-out", protectedRoutes, logOut)


//userRoutes

router.get("/",getAllUser)
router.get("/:id",getSingleUser)
router.delete("/:id",deleteUser)
router.patch("/:id",updateUser)

module.exports = router