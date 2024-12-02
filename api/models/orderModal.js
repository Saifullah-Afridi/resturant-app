const mongoose = require('mongoose'); 

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    dishes: [
        {
            dish: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Dish",
                required:true
            },
            quantity: {
                type: Number,
                required:true
            }
        }    
    ],
    dishesPrice: {
        type: Number,
        required:true,
    },
    deliveryPrice: {
        type: Number,      
        default:20  
    },
    totalPrice: {
        type: Number,
        required:true
    },
    status: {
        type: String,
        enum: ["pending", "onTheWay", "delivered"],     
        default:"pending"
    },
     deliveryDetails: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
},{timestamps:true});

//Export the model
const Order = mongoose.model('Order', orderSchema);
module.exports = Order