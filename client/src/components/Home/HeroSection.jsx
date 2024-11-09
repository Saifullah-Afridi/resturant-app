import React from "react";
const HeroSection = () => {
  return (
    <div className=" h-[80vh]  bg-no-repeat  bg-cove bg-[url('/header_img.png')] bg-center">
      <div className=" h-[82vh] w-[80%] mx-auto flex flex-col justify-center  ">
        <h1 className="text-4xl font-semibold text-white  leading-[50px] ">
          Order Your <br /> favourite Food here
        </h1>
        <p className="text-white my-3">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, ea
          eveniet aliquid pariatur beatae rerum <br /> possimus. Perspiciatis
          dolorem delectus saepe?
        </p>
        <button className=" text-sm mt-3 self-start border  px-5 p-2 rounded-full bg-white hover:bg-gray-300   ">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
