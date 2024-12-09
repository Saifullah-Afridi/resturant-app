import React from "react";

const ViewOrderDetail = ({ isOpen, handleOpen, orderDetail }) => {
    const { dishes, deliveryDetails, totalPrice, deliveryPrice } = orderDetail;
    console.log(orderDetail);

    return isOpen ? (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-[999]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/5">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">Order Details</h2>

                <p className="mb-2 text-gray-800">
                    <strong className="mr-2 text-gray-600">Delivery Name:</strong>
                    {deliveryDetails.name}
                </p>
                <p className="mb-2 text-gray-800">
                    <strong className="mr-2 text-gray-600">Phone:</strong>
                    {deliveryDetails.phone}
                </p>

                <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Dishes</h3>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">Image</th>
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Price</th>
                                <th className="border border-gray-300 p-2">Quantity</th>
                                <th className="border border-gray-300 p-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetail?.dishes?.map((dish, index) => (
                                <tr key={dish._id}>
                                    <td className="border border-gray-300 p-2">
                                        <img
                                            src={dish?.dish?.image?.url}
                                            alt={dish?.dish?.name}
                                            className="h-20 w-20 object-cover rounded"
                                        />
                                    </td>
                                    <td className="">{dish.dish.name}</td>
                                    <td >{dish.dish.price}$</td>
                                    <td className="border border-gray-300 p-2">{dish.quantity}</td>
                                    <td className="border border-gray-300 p-2">
                                        ${dish.dish.price * dish.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 text-right">
                    <p className="text-gray-700">
                        <strong>Delivery Price:</strong> ${deliveryPrice}
                    </p>
                    <p className="text-gray-700">
                        <strong>Dishes Price:</strong> $
                        {orderDetail.dishesPrice
                        }
                    </p>
                    <p className="text-gray-900 font-semibold">
                        <strong>Total Price:</strong> ${totalPrice}
                    </p>
                </div>

                <div className="mt-6 text-right">
                    <button
                        onClick={() => handleOpen(false)}
                        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default ViewOrderDetail;
