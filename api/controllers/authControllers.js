    const User = require("../models/userModal")
    const jwt = require("jsonwebtoken")




    const SignUp = async (req, res) => {

        
        try {
            const { name, email, phone, address, password, passwordConfirm } = req.body;
            const findUser = await User.findOne({ email, phone })
            
            if (findUser) {
            return  res.status(200).json({
                    status: "fail",
                    message: "User Already exist"
                })
            }
            const newUser = await User.create({name,email,phone,address,password,passwordConfirm})

            res.status(201).json({
                status: "success",
                message: "User created successfully",
                newUser
            })
        } catch (error) {
            res.status(500).json({
                staus: "fail",
                message:error
            })
            
        }
    }


    // will optimize it later
    const logIn = async (req, res) => {
        try {

            

            
            const { email, phone, password } = req.body
            if (!password || (!email && !phone)) {
                return res.status(400).json({
                    status: "fail",
                    message: "Please provide email/phone and password"
                })
            }
            let user;
            if (email) {
                user = await User.findOne({ email }).select("+password")
                
            }
            if (phone) {
                user = await User.findOne({ phone }).select("+password")
                
            }
            
            
            if (!user) {
                return res.status(401).json({
                    status: "fail",
                    messsage: "Please provide correct credientials"
                })
            }
            
            const isPasswordCorrect = user.comparePassword(password)
            console.log(isPasswordCorrect);
            
            if (!isPasswordCorrect) {
                return res.status(401).json({
                    status: "fail",
                    messsage:"Please provide correct credientials"
                })
            }
             console.log(user);

        const token =  await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn:"9d"
        })
            
            user = await User.findByIdAndUpdate(user._id, {
                isTokenRevoked:false
            },{new:true})
            
console.log(token);

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                maxAge: 9 * 24 * 60 * 60 * 1000,
            })
           
            
            res.status(200).json({
                stauts: "success",
                user
            })
        } catch (error) {
            console.log(error);
            
            res.status(500).json({
                status: "fail",
                message:error
            })
            
        }
    }

    const logOut = async (req, res) => {
        
        try {
            const id = req.user._id
            
        const user = await User.findByIdAndUpdate(id, {
                isTokenRevoked:true
        },{new:true}
        )

        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
        })
        res.status(200).json({
            status: "success",
            message: "You have been log out",
        })
            } catch (error) {
            res.staus(500).json({
                status: "fail",
                message:error.message
            })
        }
    }



    const protectedRoutes = async (req, res,next) => {
        
        const token = req.cookies?.token;
        
        if (!token) {
            return res.status(401).json({
                status: "fail",
                message:"please login to access this"
            })
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        const currentUser = await User.findById(payload._id)
        
        // if the user still exist or not 
        if (!currentUser) {
                return res.status(401).json({
                    status: "fail",
                    message: "The user belonging to this token no longer exists",
                });
            }
        if (currentUser.isTokenRevoked) {
            return res.status(401).json({
                status: "fail",
                message: "Your session has ended. Please log in again",
            })
        }
        
        req.user = currentUser
        
        next()
    }


    const isAdmin =  (req, res,next) => {
        const user = req.user;
        if (!(user.role==="admin")) {
            return res.status(401).json({
                status: "fail",
                message:"Your not allowed to perform this action"
            })
        }
        next()
    }

    const checkingAdminController = (req, res) => {
        res.json({
            message:"hello there i am admin"
        })
    }

    module.exports = { SignUp,logIn,logOut,protectedRoutes,isAdmin,checkingAdminController}