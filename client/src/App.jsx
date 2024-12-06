import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import Home from "./components/Home/Home";
import DishDetail from "./components/dishDetail.jsx/DishDetail";
import Page404 from "./components/404Page/Page404";
import Footer from "./components/footer/Footer";
import AdminLayout from "./components/admin/adminlayout/AdminLayout";
import Categories from "./components/admin/categories/Categories";
import DishesAdmin from "./components/admin/categories/DishesAdmin";
import Users from "./components/admin/users/users";
import AuthenticationPage from "./components/navbar/Authentication";
import LoadingScreen from "./components/LoadingScreen";
import Login from "./components/Login";


//role based authentication
//tomorrow task

const App = () => {
  const { pathname } = useLocation();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (pathname === "/") {
  //     setLoading(true);
  //     const timer = setTimeout(() => {
  //       setLoading(false);
  //     }, 2000);

  //     return () => clearTimeout(timer);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [pathname]);

  return (
    <>
      {/* {loading && pathname === "/" && <LoadingScreen />} */}
      {!pathname.startsWith("/admin") && <Navigation />}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/dish-detail/:id" element={<DishDetail />} />
        <Route path="/sign-up" element={<AuthenticationPage />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="categories" element={<Categories />} />
          <Route path="dishes" element={<DishesAdmin />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" exact element={<Page404 />} />
      </Routes>
      {!pathname.startsWith("/admin") && <Footer />}
    </>
  );
};

export default App;
