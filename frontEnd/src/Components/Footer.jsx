import React from "react";
import Container from "react-bootstrap/Container";
import Logo from "../assets/images/logo.png";
import { FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <Container fluid className="bg-[#46a679]">
        <div className="flex flex-col justify-center text-white py-4 items-center gap-3">
          <img
            alt=""
            src="https://mayur-panchal-0410.github.io/Themenu.github.io/page1img/sslogo.png"
            width="100"
            className="d-inline-block align-top mb-2"
          />
          <div className="text-3xl font-bold">ABOUT US</div>
          <div className="text-md flex text-center">
            Serving yummy Indian, Italian, and Chinese fast food delicacies in a
            breathtakingly gorgeous ambience! <br />
            We offer party decorations to make your special moments extra
            special!
          </div>
          <div className="text-3xl font-bold">Average Cost</div>
          <div className="text-md flex text-center">
            INR 400 for two people (approx.)
          </div>
          <div className="text-3xl font-bold">OPENING HOURS</div>
          <div className="text-md flex text-center">
            12:00 PM - 11:00 PM
            <br />
            Happily Serving You Everyday!!
          </div>{" "}
          <hr className="w-full h-px bg-gray-200 border-0 dark:bg-white-700" />
          <div className="text-3xl font-bold">CONTACT US</div>
          <div className="text-md flex text-center">
            Khandwa Road (Indore) <br />
            Near By Swami Narayan Mandir
          </div>
          <div className="text-3xl font-bold">FOLLOW US</div>
          <hr className="w-full h-px bg-gray-200 border-0 dark:bg-white-700" />
          <div className="text-md flex text-center gap-x-4">
            <FaInstagram className="text-5xl" />
            <FaTwitter className="text-5xl" />
          </div>
          <hr className="w-full h-px bg-gray-200 border-0 dark:bg-white-700" />
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
