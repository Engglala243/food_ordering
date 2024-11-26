<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <>
      <Container fluid className="bg-[#51FF00]">
        <div className="flex justify-center text-black p-2 text-xs md:text-sm text-center">
          Enjoy Yummy Licious Fast Food!
        </div>
      </Container>
      <div className="upper-head border-1 border-[#289C4F]">
        <Navbar className="p-0 bg-[#289C4F]">
          <Navbar.Brand href="#home" className="mx-3 flex items-center">
            <img
              alt=""
              src={Logo}
              width="50"
              className="d-inline-block align-top"
            />
            <div className="font-bold d-inline-block text-sm md:text-[1rem] mx-1.5 text-white">
              Shiv Sagar Restaurant
            </div>
          </Navbar.Brand>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
=======
=======
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/images/logo.png";

const Header = ({ headingName }) => {
  headingName = "We-Menu";
  return (
    <>
<<<<<<< HEAD
      <Container fluid className="bg-[#51FF00]">
=======
      <Container fluid className="bg-[#46a679]">
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
        <div className="flex justify-center text-black p-2 text-xs md:text-sm text-center">
          Enjoy Yummy Licious Fast Food!
        </div>
      </Container>
      <div className="upper-head border-1 border-[#289C4F]">
<<<<<<< HEAD
        <Navbar className="p-0 bg-[#289C4F]">
=======
        <Navbar className="p-0 bg-[#ecefed]">
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
          <Navbar.Brand href="#home" className="mx-3 flex items-center">
            <img
              alt="Logo"
              src={Logo}
              width="50"
              className="d-inline-block align-top"
            />
            <div className="font-bold d-inline-block text-[1rem] mx-1.5">
              {headingName}
            </div>
          </Navbar.Brand>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
