import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './../categories/Spinner';

const UpdateStatusModal = ({ isOpen, handleOpen, refetchOrder, orderDetail }) => {
    const [status, setStatus] = useState(orderDetail.status);
    const [loading, setLoading] = useState(false)

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`http://localhost:3000/api/v1/orders/update-status/${orderDetail._id}`, { status }, {
                withCredentials: true
            })


            if (res) {
                handleOpen(false);
                refetchOrder()
            }
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            {
                isOpen && <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-[999]">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/5">
                        {loading ? <Spinner /> : <div>
                            <h2 className="text-xl font-semibold mb-4 text-blue-600">Update Order Status</h2>
                            <p className="mb-2 text-gray-800"><strong className='mr-2 text-gray-600'>Delivery Name:</strong> {orderDetail.deliveryDetails.name}</p>
                            <p className="mb-2 text-gray-800"><strong className='mr-2 text-gray-600'>Phone:</strong> {orderDetail.deliveryDetails.phone}</p>
                            <p className="mb-4 text-gray-800"><strong className='mr-2 text-gray-600'>Current Status:</strong> {orderDetail.status}</p>

                            <div className="mb-4">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Update Status:</label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={handleStatusChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="onTheWay">On the Way</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Update Status
                                </button>
                                <button
                                    onClick={() => handleOpen(false)}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                >
                                    Close
                                </button>
                            </div>
                        </div>}
                    </div>
                </div>
            }
        </>
    )

};

export default UpdateStatusModal;
