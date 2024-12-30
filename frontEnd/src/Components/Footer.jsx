import Container from "react-bootstrap/Container";
import Logo from "../assets/images/logo.png";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <Container fluid className="bg-[#46a679] p-4">
        <div className="container mx-auto py-4 gap-6 flex flex-col md:flex-row md:gap-0">
          {/* First section of footer */}
          <div className="flex flex-col gap-2 basis-1/2 md:flex-row">
            <div className="mt-2">
              <img src={Logo} className="w-20 md:w-24" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="">
                <div className="text-gray-100 text-2xl font-medium">
                  Let&apos;s keep in touch
                </div>
                <div className="text-gray-200 text-lg">
                  Find us on any of these platforms, we respond 1-2 business
                  days.{" "}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex items-center justify-center text-blue-400 text-2xl rounded-full bg-green-700 w-10 h-10">
                  <FaTwitter />
                </div>
                <div className="flex items-center justify-center text-orange-400 text-2xl rounded-full bg-green-700 w-10 h-10">
                  <FaInstagram />
                </div>
              </div>
            </div>
          </div>
          {/* Second section of footer */}
          <div className="flex flex-col basis-1/3">
            <div className="text-gray-200 text-lg font-medium">
              USEFUL LINKS
            </div>
            <div className="text-base flex flex-col">
              <Link
                to="/user/login"
                style={{ textDecoration: "none" }}
                className="text-gray-100 hover:text-gray-600"
              >
                Login
              </Link>
              <Link
                to="/user/register"
                style={{ textDecoration: "none" }}
                className="text-gray-100 hover:text-gray-600"
              >
                Register
              </Link>
              <Link
                to="/restaurant/login"
                style={{ textDecoration: "none" }}
                className="text-gray-100 hover:text-gray-600"
              >
                Restaurant login
              </Link>
              <Link
                to="/restaurant/register"
                style={{ textDecoration: "none" }}
                className="text-gray-100 hover:text-gray-600"
              >
                Restaurant register
              </Link>
            </div>
          </div>
          {/* Third section of footer */}
          <div className="flex flex-col basis-1/3">
            <div className="text-gray-200 text-lg font-medium">ABOUT US</div>
            <div className="text-base flex flex-col gap-2 text-gray-100">
              <div>
                Serving yummy Indian, Italian, and Chinese fast food delicacies
                in a breathtakingly gorgeous ambience!
              </div>
              <div>
                We offer party decorations to make your special moments extra
                special!
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <hr className="w-full text-gray-100 border-2" />
          <div className="flex text-center text-sm text-gray-200 flex-col">
            © 2024 Shiv Sagar Food Villa
            <div className="font-bold">
              Proudly Made by Student of Coding Sharks
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Footer;
