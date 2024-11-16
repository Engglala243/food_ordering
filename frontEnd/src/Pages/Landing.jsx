import React from "react";
import { IoSearch } from "react-icons/io5";
import food01 from "../assets/images/food01.jpg";
import food02 from "../assets/images/food02.jpg";
import food03 from "../assets/images/food03.jpg";
import Head01 from "../assets/images/head01.jpg";
import Head02 from "../assets/images/head02.jpg";
import Head03 from "../assets/images/head03.jpg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineFoodBank } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import Carousel from "react-bootstrap/Carousel";
import "./style.css";

const Landing = () => {
  return (
    <>
      <Carousel className="carousel-content h-[90.67vh] mb-6">
        <Carousel.Item>
          <img src={Head01} className="head-img" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-white md:text-4xl">
              Captivating Heading
            </h2>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Head02} className="head-img" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-white md:text-4xl">
              Captivating Heading
            </h2>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Head03} className="head-img" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-white md:text-4xl">
              Captivating Heading
            </h2>
          </div>
        </Carousel.Item>
      </Carousel>
      <div className="my-20">
        <div className="flex flex-col justify-center items-center text-center">
          <div className="flex items-center sm:hover:scale-110 active:scale-110">
            <div className="text-[#69CC00] font-bold text-4xl w-64 h-64 bg-[#6b02a3] rounded-full z-10 -mr-52"></div>
            <div
              style={{ fontFamily: "Dancing_Script" }}
              className="text-[#69CC00] font-bold text-4xl w-60 h-60 bg-[#CC3499] rounded-full flex items-center justify-center inset-0 z-10"
            >
              Explore...
            </div>
          </div>
          <div
            className="mt-16 text-4xl text-green-700"
            style={{ fontFamily: "Dancing_Script" }}
          >
            Service at your Fingertips!
          </div>
          <div className="flex flex-row p-14 gap-x-32 justify-center">
            <div className="service-div">
              Choose a Restuarant
              <IoMdCheckmarkCircleOutline className="text-4xl" />
            </div>
            <div className="service-div">
              Choose a Dish
              <MdOutlineFoodBank className="text-5xl mt-2.5" />
            </div>
            <div className="service-div">
              Enjoy Your Meal!
              <IoFastFoodOutline className="text-4xl" />
            </div>
          </div>
          <div
            className="mt-16 text-4xl text-green-700"
            style={{ fontFamily: "Quicksand" }}
          >
            NOTHING BRINGS PEOPLE
            <div
              className="my-4 text-6xl text-green-700"
              style={{ fontFamily: "BiteChocolate" }}
            >
              together
            </div>
            LIKE GOOD FOOD
          </div>
          <div className="flex items-center m-24">
            <img src={food01} className="diamond-img" />
            <img src={food02} className="diamond-img" />
            <img src={food03} className="diamond-img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
