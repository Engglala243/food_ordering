import Head02 from "../assets/images/head02.jpg";
import { CiSearch } from "react-icons/ci";

const Explore = () => {
  return (
    <>
      <div className="relative flex flex-grow h-[100vh]">
        <img
          src={Head02}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="text-white text-4xl md:text-5xl z-10"
            style={{ fontFamily: "Quicksand" }}
          >
            Explore
          </div>
          <div class="flex w-auto placeholder-white bg-transparent backdrop-blur-md text-white border border-white rounded-lg p-2 focus:outline-none">
            <label>
              <CiSearch className="font-bold z-10 text-white text-3xl" />
            </label>
            <input className="bg-transparent w-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
