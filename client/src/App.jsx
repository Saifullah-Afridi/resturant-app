import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import Home from "./components/Home/Home";
import DishDetail from "./components/dishDetail.jsx/DishDetail";
import Page404 from "./components/404Page/Page404";
import Footer from "./components/footer/Footer";
import MenuSkeleton from "./components/Home/MenuSkeleton";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/dish-detail/:id" exact element={<DishDetail />} />
        <Route path="/ske" exact element={<MenuSkeleton />} />
        <Route path="*" exact element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
