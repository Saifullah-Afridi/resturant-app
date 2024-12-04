const Order = require("../models/orderModal");
const Dish = require("../models/dishModel")



const createOrder = async (req, res) => {



 
  
    const userId = req.user._id
    const {dishes,deliveryDetails} = req.body
    console.log(dishes);
    
    try {
        if (!deliveryDetails || !deliveryDetails.name || !deliveryDetails.phone || !deliveryDetails.address) {
            return res.status(400).json({
                status: "fail",
                message: "Delivery details are incomplete.",
            });
        }
        let populatedDishes = []
        let dishesPrice = 0
        for (const item of dishes) {
            const dish = await Dish.findById(item._id)
            if (!dish) {
                return res.status(404).json({
                    status: "fail",
                    message:"The dish is not found with the given id"
                })
            }
            dishesPrice = dishesPrice + (dish.price * item.quantity)
            populatedDishes.push({ dish: dish._id, quantity: item.quantity });        
        }

        const defaultDeliveryPrice = Order.schema.paths.deliveryPrice.defaultValue
        const totalPrice = dishesPrice + defaultDeliveryPrice
        const newOrder = await Order.create({
            user: userId,
            dishes: populatedDishes,
            deliveryDetails: deliveryDetails,
            totalPrice: totalPrice,
            status: "pending",
            deliveryPrice: defaultDeliveryPrice,
            dishesPrice:dishesPrice,
        })
        res.status(200).json({
            status: "success",
            message: "Your order has been placed",
            newOrder    
        })
    } catch (error) {
        res.status(500).json({

            status: "fail",
            message:error.message
        })
    }
}


const getAllOrderByMe = async (req, res) => {
    try {
        const myOrders = await Order.findOne({user:req.user._id}).populate("dishes.dish");
        if (!myOrders) {
            return res.status(404).json({
                status: "fail",
                message:"You dont have any orders"
                
            })
        }
        res.status(200).json({
            status: "success",
            myOrders
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message:error.message
        })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("dishes.dish")
        if (!orders) {
            return res.status(404).josn({
                status: "fail",
                message:"There is no order yet"
            })
        }
        res.status(200).json({
            status: "success",
            orders
        })
    } catch (error) {
         res.status(500).json({
            status: "fail",
            message:error.message
        })
    }
}
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "onTheWay", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("dishes.dish");

    if (!order) {
      return res.status(404).json({ status: "fail", message: "Order not found" });
    }

    res.status(200).json({ status: "success", order });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.updateDefaultDeliveryPrice = async (req, res) => {
  try {
    const { newDefault } = req.body;

    if (!newDefault || typeof newDefault !== "number") {
      return res.status(400).json({
        status: "fail",
        message: "Invalid or missing new default delivery price",
      });
    }

    Order.schema.paths.deliveryPrice.default(() => newDefault);

    res.status(200).json({
      status: "success",
      message: `Default delivery price updated to ${newDefault}`,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};


module.exports = {
  createOrder,
}



