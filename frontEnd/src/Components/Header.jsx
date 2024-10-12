import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/images/logo.png";
import Head01 from "../assets/images/head01.jpg";
import Head02 from "../assets/images/head02.jpg";
import Head03 from "../assets/images/head03.jpg";
import Carousel from "react-bootstrap/Carousel";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="upper-head h-[6.3rem] shadow-md ">
        <Container fluid className="bg-[#46a679]">
          <div className="flex justify-center text-white p-2">
            Enjoy Yummy Licious Fast Food!
          </div>
        </Container>
        <Navbar className="p-0">
          <Navbar.Brand href="#home" className="mx-3 flex items-center ">
            <img
              alt=""
              src={Logo}
              width="50"
              className="d-inline-block align-top"
            />
            <div className="font-bold d-inline-block text-[1rem] mx-1.5">
              Shiv Sagar Restaurant
            </div>
          </Navbar.Brand>
        </Navbar>
      </div>
      <Carousel className="carousel-content h-[90.67vh]">
        <Carousel.Item>
          <img src={Head01} className="head-img" />
          <Carousel.Caption>
            {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Head02} className="head-img" />
          <Carousel.Caption>
            {/* <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Head03} className="head-img" />
          <Carousel.Caption>
            {/* <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Header;
