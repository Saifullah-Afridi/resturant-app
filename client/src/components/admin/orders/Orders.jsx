import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderTable from './OrderTable'
import UpdateStatusModal from './UpdateStatusModal'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [error, setError] = useState("")


    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/orders", {
                withCredentials: true
            })
            console.log(res.data.orders);

            setOrders(res.data.orders)
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    useEffect(() => {
        fetchOrders()
    }, [])
    return (
        <div className="mt-5 mr-4" >
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-bold text-center tracking-wide text-[#2C3E50]">
                    Orders Mangement
                </h1>
                <div className="h-1  bg-[#2C3E50] w-[240px]"></div>
            </div>
            <div className="flex justify-end mt-2 mr-3 ">
                <button
                    className="bg-[#F39C12] px-8 py-[10px] rounded-md text-[#2C3E50] font-semibold  shadow-sm transition-all duration-300 hover:bg-[#D68910] hover:shadow-lg hover:text-[#555] hover:-translate-y-[1px] mb-5"
                >
                    Place Orders
                </button>
            </div>
            {orders && <OrderTable orders={orders} fetchOrders={fetchOrders} />}

        </div>
    )
}

export default Orders