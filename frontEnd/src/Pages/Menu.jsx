import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";

const Menu = () => {
  const [dishData, setDishData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [menuCategory, setMenuCategory] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const getDishData = () => {
    axios
      .get(`http://localhost:5000/item/data?id=${params.id}`)
      .then((response) => {
        if (response.data.data === null) {
          toast.error("Restaurant data not found!", {
            position: "top-center",
            autoClose: 2500,
          });
          navigate("/");
        } else {
          setDishData(response.data.data);
          setLoading(false);
          setMenuCategory(Object.keys(response.data.data.dishes_data)[0]);
        }
      })
      .catch((error) => {
        toast.error("Restaurant data not found!", {
          position: "top-center",
        });
        navigate("/");
      });
  };

  const handleMenuCategory = (category) => {
    setMenuCategory(category);
  };

  useEffect(() => {
    getDishData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <>
            <div className="container py-4">
              <div className="bg-gray-200 p-4 rounded-md">
                <div className="text-2xl">{dishData.restaurant_name}</div>
                <div className="text-lg">{dishData.restaurant_address}</div>
              </div>
              <div className="flex flex-row gap-3 justify-start">
                {Object.keys(dishData.dishes_data).map((key) => {
                  return (
                    <button
                      className="bg-gray-200 rounded-md p-2 px-4 my-2"
                      onClick={() => handleMenuCategory(key)}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
              {dishData.dishes_data[menuCategory].map((data) => {
                return (
                  <>
                    <div className="bg-gray-200 p-4 rounded-md flex flex-row items-center gap-4 justify-between my-2">
                      <div className="flex flex-row gap-4 items-center">
                        <img
                          src={`http://localhost:5000/public/${data.dish_image}`}
                          className="h-32 w-32 rounded-md shadow-lg"
                        />
                        <div className="flex flex-col gap-2">
                          <div className="text-xl font-bold">
                            {data.dish_name}
                          </div>
                          <div className="text-lg">{data.dish_description}</div>
                          <div className="text-lg">
                            <b>Price</b>:{data.dish_price}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <label className="font-bold text-lg">Quantity:</label>
                        <input
                          type="number"
                          className="rounded-md w-14 h-10 text-center"
                          value="0"
                          min="0"
                        />
                        <button className="text-base bg-blue-600 p-2 px-4 rounded-md text-white">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        </>
      )}
    </>
  );
};

export default Menu;
