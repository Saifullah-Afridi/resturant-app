const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide name "]
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    passwordConfirm: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    image: {
        url: String,
        public_id:String
    },
    role: {
        type: String,
        default:"user"
    }
},{timestamps:true});

const User = mongoose.model('User', userSchema);
module.exports=User