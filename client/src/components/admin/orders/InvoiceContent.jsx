import React, { forwardRef } from "react";

const InvoiceContent = forwardRef(({ orderDetail }, ref) => {
    const { dishes, deliveryPrice, totalPrice, deliveryDetails } = orderDetail;

    return (
        <div
            ref={ref}
            className="hidden print:block bg-white p-6 border rounded-lg max-w-3xl mx-auto"
        >
            <h1 className="text-2xl font-bold text-center mb-4">Invoice</h1>
            <div className="mb-4">
                <p>
                    <strong>Customer Name:</strong> {deliveryDetails?.name}
                </p>
                <p>
                    <strong>Phone:</strong> {deliveryDetails?.phone}
                </p>
            </div>
            <table className="w-full border-collapse border border-gray-300 mb-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Dish</th>
                        <th className="border border-gray-300 px-4 py-2">Quantity</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {dishes.map((dish, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">
                                {dish?.dish?.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {dish.quantity}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                ${dish?.dish?.price?.toFixed(2)}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                ${(dish?.dish?.price * dish?.quantity).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-right">
                <p>
                    <strong>Delivery Price:</strong> ${deliveryPrice?.toFixed(2)}
                </p>
                <p>
                    <strong>Total Price:</strong> ${totalPrice?.toFixed(2)}
                </p>
            </div>
        </div>
    );
});

export default InvoiceContent;
