import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/images/logo.png";
import { LiaShoppingCartSolid } from "react-icons/lia";

const Header = ({ headingName, isHome }) => {
  const navigate = useNavigate();
  headingName = "We-Menu";
  return (
    <>
      <Container fluid className="bg-[#46a679]">
        <div className="flex justify-center text-white p-2 text-xs md:text-sm text-center">
          Enjoy Yummy Licious Fast Food!
        </div>
      </Container>
      <div className="bg-transparent backdrop-blur-md">
        <Navbar className="p-0 opacity-100">
          <Navbar.Brand
            onClick={() => navigate("/")}
            href="#home"
            className="mx-3 flex items-center cursor-pointer"
          >
            <img
              alt="Logo"
              src={Logo}
              width="40"
              className="d-inline-block align-top"
            />
            {isHome ? (
              <div className="text-gray-200 font-bold d-inline-block text-[1rem] mx-1.5">
                {headingName}
              </div>
            ) : (
              <div className="text-gray-600 font-bold d-inline-block text-[1rem] mx-1.5">
                {headingName}
              </div>
            )}
          </Navbar.Brand>
          {isHome ? (
            <div className="ml-auto mr-4 text-gray-200">
              <LiaShoppingCartSolid
                size={36}
                className="cart-icon cursor-pointer #bef264"
                onClick={() => navigate("/restaurant/cart")}
              />
            </div>
          ) : (
            <div className="ml-auto mr-4 text-gray-600">
              <LiaShoppingCartSolid
                size={36}
                className="cart-icon cursor-pointer #bef264"
                onClick={() => navigate("/restaurant/cart")}
              />
            </div>
          )}
        </Navbar>
      </div>
    </>
  );
};

export default Header;
