import { useNavigate } from "react-router-dom";
import Head02 from "../../assets/images/head02.jpg";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const offerImages = [
    {
      url: "https://www.bdtask.com/blog/assets/plugins/ckfinder/core/connector/php/uploads/images/promote-your-food-combo-offers.jpg",
      title: "Special Combo Offers",
    },
    {
      url: "https://livingonthecheap.com/lotc-cms/wp-content/uploads/2019/08/mcdonalds-BOGO-for-1.png",
      title: "BOGO Deals",
    },
  ];

  const hotelNames = [
    { name: "Hotel Paradise", rating: "4.5★", cuisine: "Multi-Cuisine" },
    { name: "Ocean View Retreat", rating: "4.8★", cuisine: "Seafood" },
    { name: "Mountain Bliss Inn", rating: "4.3★", cuisine: "Continental" },
    { name: "City Lights Suites", rating: "4.7★", cuisine: "Italian" },
    { name: "Desert Oasis Hotel", rating: "4.6★", cuisine: "Arabian" },
    { name: "Lakeside Haven", rating: "4.4★", cuisine: "Chinese" },
  ];

  return (
    <div className="h-screen overflow-hidden relative">
      <img
        src={Head02}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative h-full flex flex-col mt-28 md:mt-0">
        <div className="h-1/2 pt-20 px-8">
          <div className="h-full relative overflow-hidden rounded-xl">
            <div className="image-queue-scroll flex h-full">
              {offerImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full h-full flex-shrink-0 relative"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-4">
                    <h3 className="text-white text-xl font-bold">
                      {image.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-1/2 px-8 py-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl h-full p-4 overflow-hidden">
            <div className="queue-scroll flex flex-col">
              {[...hotelNames, ...hotelNames].map((hotel, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 flex flex-col justify-between transform transition-all duration-300 cursor-pointer"
                  onClick={() => navigate("/menu/6")}
                >
                  <h3 className="text-white text-lg font-semibold">
                    {hotel.name}
                  </h3>
                  <div>
                    <span className="text-yellow-400 text-sm">
                      {hotel.rating}
                    </span>
                    <p className="text-gray-200 text-sm mt-1">
                      {hotel.cuisine}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
