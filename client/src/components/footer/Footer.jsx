import React from "react";
import Container from "../navbar/container/Container";
import FooterCol1 from "./FooterCol1";
import FooterCol2 from "./FooterCol2";
import FooterCol3 from "./FooterCol3";

const Footer = () => {
  return (
    <div className="bg-slate-700 py-8 mt-10 text-gray-300">
      <Container>
        <div className="flex justify-center  gap-20 ">
          <FooterCol1 />
          <FooterCol2 />
          <FooterCol3 />
        </div>
      </Container>
    </div>
  );
};

export default Footer;
