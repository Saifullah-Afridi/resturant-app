    const mongoose = require('mongoose'); 
    const bcryptjs = require("bcryptjs")
    const validator = require("validator")

    const userSchema = new mongoose.Schema({
        name:{
            type:String,
            required:[true,"Please provide name "]
        },
        email:{
            type:String,
            required:true,
            unique: true,
            validate: {
                validator: function (value) {
                    return validator.isEmail(value)
                }
            }
        },
        phone:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required: true,
            select: false
        },
        passwordConfirm: {
            type: String,
        
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


    userSchema.pre("save",function(next) {
        if (!this.isModified("password")) {
            return;
        }
        const salt = bcryptjs.genSaltSync(10)
        this.password = bcryptjs.hashSync(this.password, salt)
        next()
    })

userSchema.methods.comparePassword = function (enteredPassword) {
        console.log();
        
        return bcryptjs.compareSync(this.password,enteredPassword)
    }

    const User = mongoose.model('User', userSchema);
    module.exports=User