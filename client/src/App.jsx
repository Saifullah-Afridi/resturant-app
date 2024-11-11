import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./pages/Menu";
import ContactUs from "./pages/ContactUs";
import Navigation from "./components/navbar/Navigation";
import Home from "./components/Home/Home";
import DishDetail from "./components/dishDetail.jsx/DishDetail";
import Page404 from "./components/404Page/Page404";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/menu" exact element={<Menu />} />
        <Route path="/contact-us" exact element={<ContactUs />} />
        <Route path="/dish-detail/:id" exact element={<DishDetail />} />
        <Route path="*" exact element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
