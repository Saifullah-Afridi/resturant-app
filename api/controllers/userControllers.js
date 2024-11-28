const User = require("../models/userModal");


const getAllUser = async (req, res) => {
    try {
        const users = await User.find({})
        if (!users) {
            return res.status(404).json({ status:"fail",message: "No users found" });
        }
        res.status(200).json({
            status: "success",
            users
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message:error.message
       })
    }
}

const getSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ status:"fail",message: "No users found with the given information" });
        }
        res.status(200).json({
            status: "success",
            user
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message:error.message
       })
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
       const user =  await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message:"No User found with the given information"
    })
}        
        res.status(200).json({
            status: "success",
            message:"User has been deleted"
           
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message:error.message
       })
    }
}

const updateUser = async (req, res) => {
    try {

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "No fields provided to update."
            });
        }


        if (req.body.password || req.body.confirmPassword) {
            return res.status(403).json({
                status: "fail",
                message:"You can not update password through this route"
            })
        }
        const id = req.params.id;
       const user =  await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message:"No User found with the given information"
    })
}        
        res.status(200).json({
            status: "success",
            message: "User has been updated",
            user
           
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message:error.message
       })
    }
}

module.exports = {getAllUser,getSingleUser,deleteUser,updateUser}