const Cart = require("../models/cartModel");
const Dish = require("../models/dishModel")



const addToCart = async (req, res) => {
    try {
        const userId = req.user._id
        const { dishId, quantity } = req.body
        
        try {
            const dish = await Dish.findById(id)
            if (!dish) {
                return res.status(404).json({
                    status: "fail",
                    message: "Dish not found"
                })
            }

            let cart = await Cart.findOne({ user: userId })
            if (!cart) {
                cart = new Cart()
                cart.user = userId
                cart.dishes.push({
                    dish: dishId,
                    quantity:quantity
                })
                cart.price = dish.price * quantity
            } 
            const existingItem = cart.dishes.find((item) => item.dish.toString() === dishId);
            if (existingItem) {
                existingItem.quantity =  quantity+1
            }

        } catch (error) {
            
        }
    } catch (error) {
        
    }
}