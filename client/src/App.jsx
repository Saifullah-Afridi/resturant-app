import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import ContactUs from "./pages/ContactUs";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/menu" exact element={<Menu />} />
        <Route path="/contact-us" exact element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
