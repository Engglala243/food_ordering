import Head02 from "../../assets/images/head01.jpg";
import Video01 from "../../assets/videos/video_home.mp4";
import { CiSearch } from "react-icons/ci";
import "./Landing.css";

const Landing = () => {
  return (
    <>
      <div className="relative flex flex-grow h-[100vh]">
        <video
          src={Video01}
          className="absolute top-0 left-0 w-full h-full object-cover brightness-50 contrast-[1.05]"
          autoPlay
          muted
          loop
        ></video>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 md:gap-4">
          <div
            className="text-white text-5xl font-thin md:text-6xl z-10"
            style={{ fontFamily: "Quicksand" }}
          >
            Explore...
          </div>
          <div className="flex flex-row flex-shrink min-w-[30%] items-center bg-transparent backdrop-blur-md text-white border border-white rounded-lg p-2 focus:outline-none">
            <label>
              <CiSearch className="font-bold z-10 text-white text-3xl" />
            </label>
            <input className="bg-transparent w-full" />
          </div>
          <div className="text-white text-center">
            <div
              className="text-2xl mt-16 font-thin md:text-3xl"
              style={{ fontFamily: "Quicksand" }}
            >
              "NOTHING BRINGS PEOPLE
              <div
                className="my-4 text-4xl font-thin md:text-5xl"
                style={{ fontFamily: "BiteChocolate" }}
              >
                together
              </div>
              LIKE GOOD FOOD"
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
