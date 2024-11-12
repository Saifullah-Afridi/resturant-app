import React from "react";
import { Element } from "react-scroll";
const HeroSection = () => {
  return (
    <Element name="home">
      <div className="  relative h-[80vh]    bg-no-repeat  bg-cove bg-[url('/header_img.png')] bg-center">
        <div className=" absolute top-0 right-0 h-full w-full bg-black opacity-30"></div>
        <div className=" h-[82vh] w-[80%] mx-auto flex flex-col justify-center  ">
          <div className="z-50">
            <h1 className="text-5xl font-semibold text-white  leading-[60px] tracking-normal">
              Order Your <br /> favourite Food here
            </h1>
            <p className="text-white my-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi,
              ea eveniet aliquid pariatur beatae rerum <br /> possimus.
              Perspiciatis dolorem delectus saepe?
            </p>
            <button className=" text-sm mt-3 self-start border  px-5 p-2 rounded-full bg-white hover:bg-gray-300   ">
              View Menu
            </button>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default HeroSection;
