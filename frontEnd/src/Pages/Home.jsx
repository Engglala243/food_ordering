import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer.jsx";

const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-between">
        <Header />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
