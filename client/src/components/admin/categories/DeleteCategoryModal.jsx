import React from 'react'
import axios from "axios"
import Spinner from './Spinner';
import { useState } from 'react';
const DeleteCategoryModal = ({ category, setOpenDeleteModal, refetchCategories }) => {

    const [loading, setLoading] = useState(false)
    const handleDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`http://localhost:3000/api/v1/categories/${category._id}`);
            await refetchCategories()
            setOpenDeleteModal(false)


        } catch (error) {
            console.error("Error deleting resource:", error.message);
        } finally {
            setLoading(false)
        }
    };


    const handleCloseModal = () => {
        setOpenDeleteModal(false)
    }

    return (
        <div className='fixed top-0 left-0 h-full w-full bg-black bg-opacity-40 z-50 flex justify-center items-center' onClick={handleCloseModal}>
            <div className='bg-white h-[250px] w-2/5 rounded-lg flex flex-col p-2 justify-center items-center  gap-2 shadow-lg overflow-hidden' onClick={(e) => e.stopPropagation()}>
                {loading ? <Spinner /> : (

                    <div className='w-full flex flex-col items-center gap-9' >
                        <h2 className=' text-2xl' >Are You sure want to delete!</h2>
                        <div className="flex gap-5 " >
                            <button className='ml-auto w-28 py-2 bg-red-500  rounded-lg  hover:bg-red-400 ' onClick={handleCloseModal}> Cancel</button>
                            <button className='ml-auto  w-28 bg-blue-500  rounded-lg hover:bg-blue-600' onClick={handleDelete}  >Delete</button>
                        </div>

                    </div>
                )}

            </div>


        </div >
    )
}

export default DeleteCategoryModal