import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer.jsx";

const Home = () => {
  return (
    <>
      <Header />
      <div className="p-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Home;
