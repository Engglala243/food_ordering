import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const location = useLocation();
  const [isHome, SetIsHome] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      SetIsHome(true);
    } else {
      SetIsHome(false);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <>
      <div className="flex flex-col min-h-screen justify-between">
        <div className="fixed z-3 w-screen">
          <Header isHome={isHome} />
        </div>
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer
          isHome={isHome}
          count={useSelector((state) => state.cart.cartItems.length)}
        />
      </div>
    </>
  );
};

export default Home;
