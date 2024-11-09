import React from 'react'
import Container from '../navbar/container/Container'
import { Link } from 'react-router-dom';
import NavigationLinks from '../navbar/NavigationLinks';

const Footer = () => {
  return (
    <div className="bg-slate-700 py-8 mt-10 text-gray-300">
        <Container>

      <div className="flex justify-center  gap-20 ">
        <div className="flex-1 flex flex-col gap-1">
          <Link onClick={()=>{
            window.screenTop()
          }}  to="/">
            <h1 className="cursor-pointer text-2xl font-bold text-amber-500">
              Tomato.
            </h1>
          </Link>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vitae
            doloremque aliquid non itaque odio dignissimos amet iste sapiente
            harum.
          </p>
        </div>
        <div className="flex flex-col flex-1 gap-3">
          <h3 className='text-white text-xl font-semibold'>Company</h3>
          <div className="flex flex-col gap-1 ">
            <Link to="/">Home</Link>
            <Link to="">About Us</Link>
            <Link to="">Contact Us</Link>
          </div>
        </div>
        <div className=" flex-1 flex flex-col gap-2">
          <h3 className='text-white text-xl font-semibold'>Get In Touch</h3>
           <p className='cursor-pointer'  >tel:2334234324323</p>
          <p  className='cursor-pointer'>email:2334234324323</p>
        </div>
      </div>
        </Container>
    </div>
  );
}

export default Footer