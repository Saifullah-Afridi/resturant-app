    import axios from 'axios'
    import React, { useState } from 'react'
    import Spinner from './Spinner'

    const EditCategoryModal = ({ category, setOpenEditModal, refetchCategories }) => {
        const [loading, setLoading] = useState(false)
        const [imagePreview, setImagepreview] = useState(category.image.url || "")
        const [categoryData, setCategoryData] = useState({
            name: category.name || "",
            image: category.image.url || ""
        })
        const handleChangeImage = (e) => {
            const file = e.target.files[0]
            if (file) {
                setCategoryData({
                    ...categoryData, image: file
                })
                const reader = new FileReader()

                reader.onload = (e) => {
                    setImagepreview(e.target.result)
                }

                reader.readAsDataURL(file)
            }
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            const dataToSend = new FormData()
            dataToSend.append("name", categoryData.name)
            dataToSend.append("image", categoryData.image)
            setLoading(true)
            try {

                await axios.patch(`http://localhost:3000/api/v1/categories/${category._id}`, dataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                await refetchCategories()
                setOpenEditModal(false)
            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false)
            }
        }
        return (
            <div className='fixed top-0 left-0 h-full w-full flex justify-center items-center bg-black bg-opacity-50' onClick={() => setOpenEditModal(false)}  >

                <div className='bg-white h-[500px] w-3/5 rounded-lg shadow-lg flex flex-col justify-center items-center overflow-auto p-4' onClick={(e) => e.stopPropagation()} >
                    {loading ? <Spinner /> : (<>
                        <div className='flex flex-col items-center gap-1'  >
                            <h2 className="text-2xl font-bold text-gray-800">Edit Category</h2>
                            <div className='h-1 bg-gray-800 w-40' ></div>
                        </div>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-[70%] mx-auto mt-6'  >
                            <div className='flex flex-col gap-2 ' >
                                <label htmlFor="name" className='text-gray-700 text-[13px]' >Name <span className='text-red-500'>*</span> </label>
                                <input type="text" name="name" id="name" value={categoryData.name} onChange={(e) => setCategoryData({
                                    ...categoryData, name: e.target.value
                                })} className='outline-none ring-1 rounded-md p-2  ' />
                            </div>
                            <div className='flex flex-col gap-2 ' >
                                <label htmlFor="name" className='text-gray-700 text-[13px]' >Image <span className='text-red-500'>*</span> </label>
                                <input type="file" name="image" id="image" onChange={handleChangeImage} />
                            </div>
                            <img src={imagePreview} alt="category image" width={200} />
                            <div className='flex  gap-3' >
                                <button className='bg-amber-500 hover:bg-amber-600 flex-1  p-3 rounded-lg'>
                                    Submit
                                </button>
                                <button className='bg-red-500 hover:bg-red-600 p-3 rounded-lg flex-1 ' onClick={() => setOpenEditModal(false)}>
                                    Cancel
                                </button>

                            </div>
                        </form>
                    </>)}
                </div>

            </div>
        )
    }

    export default EditCategoryModal