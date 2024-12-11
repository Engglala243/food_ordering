import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import { addToCart } from "../features/CartSlice";
import { useSelector, useDispatch } from "react-redux";

const Menu = () => {
  const dispatch = useDispatch();
  const [dishData, setDishData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [menuCategory, setMenuCategory] = useState("");
  const [menuCategoryLength, setMenuCategoryLength] = useState(null);
  const [initialIndex, setInitialIndex] = useState(0);
  const cart = useSelector((state) => state.cart.cartItems);
  const params = useParams();
  const navigate = useNavigate();
  const MAX_DISHES = 8;

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

  // const addToCart = (item) => {
  //   const updatedCart = [...cart, { ...item, quantity: 1 }];
  //   setCart(updatedCart);
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  // };

  const handleMenuCategory = (category) => {
    setMenuCategory(category);
    setMenuCategoryLength(dishData.dishes_data[category].length);
  };

  const handlePage = (pageAction) => {
    if (menuCategoryLength > 8) {
      setHasMoreData(true);
    }
    if (pageAction == "next") {
      setCurrentPage(currentPage + 1);
      setInitialIndex(MAX_DISHES * currentPage);
    } else {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        if (currentPage === 2) {
          setInitialIndex(0);
        } else {
          setInitialIndex(initialIndex / 2);
        }
      }
    }
  };

  useEffect(() => {
    getDishData();
    console.log(hasMoreData, "<=== Has More Data");
  }, []);

  useEffect(() => {
    setInitialIndex(0);
    setCurrentPage(1);
  }, [menuCategory]);

  console.log(cart, "<=== Cart");
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="container py-4">
            <div className="bg-gray-200 p-4 rounded-md">
              <div className="text-2xl">{dishData.restaurant_name}</div>
              <div className="text-lg">{dishData.restaurant_address}</div>
            </div>
            <div className="flex flex-row gap-3 justify-start">
              {Object.keys(dishData.dishes_data).map((menu, inx) => {
                return (
                  <button
                    className="bg-gray-200 rounded-md p-2 px-4 my-2"
                    onClick={() => handleMenuCategory(menu)}
                    key={inx + 2}
                  >
                    {menu}
                  </button>
                );
              })}
            </div>
            {dishData.dishes_data[menuCategory].map((data, inx) => {
              if (inx >= initialIndex && inx < currentPage * MAX_DISHES) {
                return (
                  <>
                    <div
                      className="bg-gray-200 p-4 rounded-md flex flex-row items-center gap-4 justify-between my-2"
                      key={data.dish_id}
                    >
                      <div className="flex flex-row gap-4 items-center">
                        <img
                          src={`http://localhost:5000/public/${data.dish_image}`}
                          className="h-32 w-32 rounded-md shadow-lg"
                        />
                        <div className="flex flex-col gap-2">
                          <div className="text-xl font-bold">
                            {data.dish_name}
                          </div>
                          <div className="text-lg w-96">
                            {data.dish_description}
                          </div>
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
                          min="0"
                          defaultValue="0"
                        />
                        <button
                          className="text-base bg-blue-600 p-2 px-4 rounded-md text-white"
                          onClick={() =>
                            dispatch(
                              addToCart({
                                ...data,
                                quantity: 1,
                                restaurant_id: dishData.restaurant_id,
                              }),
                            )
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </>
                );
              }
            })}
            <div className="flex flex-row gap-2 justify-center">
              <button
                className="bg-gray-200 px-2 py-1 rounded-md w-auto"
                onClick={() => handlePage("prev")}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <div className="bg-gray-200 px-2 py-1 rounded-md w-auto">
                {currentPage}
              </div>
              <button
                className="bg-gray-200 px-2 py-1 rounded-md w-auto"
                onClick={() => handlePage("next")}
                disabled={
                  currentPage === Math.ceil(menuCategoryLength / MAX_DISHES)
                }
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Menu;
