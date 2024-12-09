import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import UpdateStatusModal from './UpdateStatusModal';
import ViewOrderDetail from './ViewOrderDetail';

const OrderTable = ({ orders, fetchOrders }) => {
    const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState(false)
    const [openViewDetailModal, setOpenViewDetailModal] = useState(false);

    const [orderDetail, setOrderDetail] = useState({})

    const columnsDef = [{

        headerName: "Name",
        // valueGetter: (params) => params.data.deliveryDetails?.name
        field: "deliveryDetails.name"

    }, {
        headerName: "Phone",
        // valueGetter: (params) => params.data.deliveryDetails?.name
        field: "deliveryDetails.phone",
        width: 170

    },
    {
        headerName: "Status",
        field: "status",
        width: 150
    },
    {
        headerName: "Update Status",
        cellRenderer: (params) => <button onClick={() => {
            setOpenUpdateStatusModal(true)
            setOrderDetail(params.data)
        }} className='bg-blue-500 w-full mt-2 rounded-lg' >Update Status</button>,
        sortable: false,
        width: 150,

    },
    {
        headerName: "View Detail",
        width: 150,
        cellRenderer: (params) => <button onClick={() => {
            setOpenViewDetailModal(true);
            setOrderDetail(params.data);
        }} className='bg-green-500 w-full mt-2 rounded-lg' >View</button>,
        sortable: false
    },
    {
        headerName: "Cancel Order",
        cellRenderer: (params) => <button className='bg-red-500 w-full mt-2 rounded-lg' >Cancel</button>,
        sortable: false,
        width: 150,

    }


    ]
    return (
        <>
            <div className='ag-theme-quartz h-[400px] w-full  ' ><AgGridReact rowData={orders} columnDefs={columnsDef} rowHeight={60} /></div>



            {openUpdateStatusModal && <UpdateStatusModal isOpen={openUpdateStatusModal} handleOpen={setOpenUpdateStatusModal} refetchOrder={fetchOrders} orderDetail={orderDetail} />}


            {openViewDetailModal && (
                <ViewOrderDetail
                    isOpen={openViewDetailModal}
                    handleOpen={setOpenViewDetailModal}
                    orderDetail={orderDetail}
                />
            )}
        </>
    )
}

export default OrderTable