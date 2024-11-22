import axios from 'axios';
import React from 'react'

const DishDeleteModal = ({ dish, setOpenDeleteModal, refetchDishes }) => {

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/dishes/${dish._id}`)
            setOpenDeleteModal(false)
            refetchDishes()

        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div className='fixed top-0 left-0 h-full w-full bg-black bg-opacity-40 z-50 flex justify-center items-center' onClick={() => setOpenDeleteModal(false)}>
            <div className='bg-white h-[250px] w-2/5 rounded-lg flex flex-col p-2 justify-center items-center  gap-2 shadow-lg overflow-hidden' onClick={(e) => e.stopPropagation()}>
                <div className='w-full flex flex-col items-center gap-9' >
                    <h2 className=' text-2xl' >Are You sure want to delete!</h2>
                    <div className="flex gap-5 " >
                        <button className='ml-auto w-28 py-2 bg-red-500  rounded-lg  hover:bg-red-400 ' onClick={() => setOpenDeleteModal(false)} >Cancel</button>
                        <button className='ml-auto  w-28 bg-blue-500  rounded-lg hover:bg-blue-600' onClick={handleDelete} >Delete</button>
                    </div>

                </div>

            </div>


        </div>
    )
}

export default DishDeleteModal