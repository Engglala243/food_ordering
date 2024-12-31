import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer.jsx";

const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-between">
        <div className="fixed z-3 w-screen">
        <Header/>
        </div>
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
