import React from "react";
import Head01 from "../assets/images/head01.jpg";
import "./style.css";
import Explore from "../Components/Explore";

const Landing = () => {
  return (
    <>
      <div className="flex flex-grow">
        <img src={Head01} className="head-img h-[90.67vh]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-white text-center">
            <div
              className="text-2xl mt-16 md:text-4xl"
              style={{ fontFamily: "Quicksand" }}
            >
              "NOTHING BRINGS PEOPLE
              <div
                className="my-4 text-4xl md:text-6xl"
                style={{ fontFamily: "BiteChocolate" }}
              >
                together
              </div>
              LIKE GOOD FOOD"
            </div>
          </h2>
        </div>
      </div>
      <Explore />
    </>
  );
};

export default Landing;
