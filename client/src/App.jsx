import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import Home from "./components/Home/Home";
import DishDetail from "./components/dishDetail.jsx/DishDetail";
import Page404 from "./components/404Page/Page404";
import Footer from "./components/footer/Footer";
import AdminLayout from "./components/admin/adminlayout/AdminLayout";
import Categories from "./components/admin/categories/Categories";
import DishesAdmin from "./components/admin/categories/DishesAdmin";
import Spinner from "./components/admin/categories/Spinner";
const App = () => {
  const { pathname } = useLocation();
  return (
    <>
      {!pathname.startsWith("/admin") && <Navigation />}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/dish-detail/:id" exact element={<DishDetail />} />
        <Route path="*" exact element={<Page404 />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="categories" element={<Categories />} />
          <Route path="dishes" element={< DishesAdmin />} />
        </Route>
        <Route path="spinner" element={<Spinner />} />
      </Routes>
      {!pathname.startsWith("/admin") && <Footer />}
    </>
  );
};

export default App;
