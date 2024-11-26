const User = require("../models/userModal")

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
            user = await User.findOne({email})
        }
        if (phone) {
            user = await User.findOne({phone})
        }
        const isPasswordCorrect = user.comparePassword(password)

        if (!user || !isPasswordCorrect) {
            return res.status(404).json({
                status: "fail",
                messsage:"Please provide correct credientials"
            })
        }
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

    

module.exports = { SignUp,logIn}