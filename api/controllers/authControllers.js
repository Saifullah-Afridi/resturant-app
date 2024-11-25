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
            message:error.message
        })
        
    }
}