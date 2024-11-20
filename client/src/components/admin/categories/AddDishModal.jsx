import axios from 'axios';
import React, { useState } from 'react'

const AddDishModal = ({openModal,setOpenModal}) => {
 const [formData,setFormData]  = useState({
  name:"",
  description:"",
  price:0,
  category:"",
  flavors:"",
  ingredients:"",
  image:null
 })
const [imagePreview,setImagePreview]  = useState(null);
const [error,setError] = useState("")


 const handleInput  = (e)=>{
  setError("")
  setFormData({...formData,[e.target.name]:e.target.value})
 }

const handleFileUpload =(e)=>{
  e.preventDefault();
  const file = e.target.files[0];
  if(file){
    setFormData({...formData,image:file});
    const reader =new  FileReader();

    reader.onload=(e)=>{
      setImagePreview(e.target.result)
    }
    reader.readAsDataURL(file);
  }
}

const handleSubmit  = async (e)=>{
  e.preventDefault();

  if(!formData.name.trim() || !formData.category.trim() || !formData.description.trim() || !formData.ingredients.trim() || !formData.flavors.trim() || formData.price<=0 || !formData.image ){
    setError("Please fill all fields");
    return;
  }
   const formDataToSend = new FormData();
    
    // Append all the data from formData to FormData instance
    formDataToSend.append('name', formData.name);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('ingredients', formData.ingredients);
    formDataToSend.append('flavors', formData.flavors);
    formDataToSend.append('image', formData.image)
  try {
    const res = await axios.post("http://localhost:3000/api/v1/dishes",formDataToSend ,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    if(res){
      setOpenModal(false);
    }
  } catch (error) {
    console.log(error);
    
    setError(error.response.data.message)
  }

}
  return (
    <>

     {openModal && (
  <div
    className="z-[98] fixed top-0 right-0 w-full h-full bg-black bg-opacity-60 flex flex-col justify-center items-center"
    onClick={() => setOpenModal(false)}
  >
    {/* content area  */}
    <div className='h-auto w-3/5 bg-[#f9f9f9] shadow-lg rounded-md opacity-1 p-4 overflow-auto' onClick={(e)=>e.stopPropagation()} >
    <div className='  flex items-center flex-col gap-1'>
      <h1 className='text-[#2C3E50] text-2xl font-bold tracking-wide'>Add Dish</h1>
       {/* here  */}
      <div className='h-1 bg-[#2C3E50] w-28 ' >
        
      </div>

    </div>
    {error && <div className='my-3 bg-red-100 h-14 shadow-lg p-2'>
      <p className='text-md font-semi-bold  text-red-900 text-center ' > !!! {error} !!!</p>
      </div>}
    <form className='flex flex-col  gap-3 w-4/5 mt-7 mx-auto p-5 ' onSubmit={handleSubmit} >
    <div className='flex  gap-3' >
            <input type="text" className=' p-2   rounded-sm border-none  outline-none ring-1 flex-1  ring-black shadow-2xl h-10 border border-black  ring-opacity-30'  name="name" id="name" placeholder='Enter dish name... ' value={formData.name} onChange={handleInput} />

             <input type="text" className=' p-2   rounded-sm border-none  outline-none ring-1 flex-1  ring-black shadow-2xl h-10 border border-black  ring-opacity-30'  name="category" id="category" placeholder='Enter Category. e.g,Salad ' value={formData.category} onChange={handleInput} />

             <input type="number" className=' p-2   rounded-sm border-none  outline-none ring-1 flex-1  ring-black shadow-2xl h-10 border border-black  ring-opacity-30'  name="price" id="price" placeholder='Enter price' value={formData.price} onChange={handleInput} />
            
    </div>

    <textarea name="description" id="description" className='mt-2 p-2 outline-none ring-1 ring-black rounded-sm shadow-lg  ring-opacity-30 '  placeholder='Enter Food description here....' value={formData.description} onChange={handleInput}></textarea>

    <textarea name="ingredients" id="ingrediants" className='mt-2 p-2 outline-none ring-1 ring-black rounded-sm shadow-lg  ring-opacity-30 '  placeholder='Enter ingrediants here eg.Tomatoes,Cucumbers...' value={formData.ingredients} onChange={handleInput}></textarea>


    <textarea name="flavors" id="flavors" className='mt-2 p-2 outline-none ring-1 ring-black rounded-sm shadow-lg ring-opacity-30 '  placeholder='Enter Flavours here eg.Fresh,slightly salty...' value={formData.flavors}x onChange={handleInput}></textarea>

    <div type="button" className='relative hover:bg-amber-400 shadow-lg mt-2 ' >
      <button type='button' className=' ring-1 ring-amber-500 shadow-lg  p-2 w-full '  >Upload image </button>
      <input type="file" name="" id="" className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer ' onChange={handleFileUpload}  />
    </div>
    {imagePreview &&<div>

      <img src={imagePreview} alt="image preview" className=' my-2 rounded-lg' />
    </div>}
    <button type="submit" className=' mt-2 rounded-md bg-amber-500 hover:bg-amber-600   hover:shadow-2xl  p-2 w-full ' >Add dish </button>
        </form>
    </div>
  </div>
)}



    </>
  )
}

export default AddDishModal