import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import { addToCart, updateCartQuantity } from "../features/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import MenuCategory from "../Components/MenuCategory";

const Menu = () => {
  const dispatch = useDispatch();
  const [dishData, setDishData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [menuCategory, setMenuCategory] = useState("");
  const [menuCategoryLength, setMenuCategoryLength] = useState(null);
  const [initialIndex, setInitialIndex] = useState(0);
  const user_id =
    parseInt(useSelector((state) => state.auth.userId)) || undefined;
  const params = useParams();
  const navigate = useNavigate();
  const MAX_DISHES = 8;
  const cart = useSelector((state) => state.cart.cartItems);

  const getDishData = () => {
    axios
      .get(`http://localhost:5000/menu/data?id=${params.id}`)
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
          setMenuCategoryLength(
            response.data.data.dishes_data[
              Object.keys(response.data.data.dishes_data)[0]
            ].length,
          );
        }
      })
      .catch((error) => {
        toast.error("Restaurant data not found!", {
          position: "top-center",
        });
        console.log(`Error: ${error}`);
        navigate("/");
      });
  };

  const handleUpdateCart = (data, change) => {
    // check first whether the item in the exists
    if (cart.find((item) => item.dish_id === data.dish_id)) {
      dispatch(
        updateCartQuantity({
          dish_id: data.dish_id,
          change,
          access_token: localStorage.getItem("access_token"),
        }),
      );
      // if not then it'll add it the cart
    } else {
      dispatch(
        addToCart({
          ...data,
          quantity: 1,
          restaurant_id: dishData.restaurant_id,
          user_id,
        }),
      );
    }
  };

  const handleMenuCategory = (category) => {
    setMenuCategory(category);
    setMenuCategoryLength(dishData.dishes_data[category].length);
  };

  const handlePage = (pageAction) => {
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
  }, []);

  useEffect(() => {
    setInitialIndex(0);
    setCurrentPage(1);
  }, [menuCategory]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="container py-4 mt-36 mb-10 md:mt-20">
            <div className="bg-gray-200 p-4 rounded-md">
              <div className="text-2xl">{dishData.restaurant_name}</div>
              <div className="text-lg">{dishData.restaurant_address}</div>
            </div>
            <div className="hidden md:block">
              <div className="flex flex-row gap-3 justify-start">
                {Object.keys(dishData.dishes_data).map((menu, inx) => {
                  return (
                    <button
                      className="bg-gray-200 rounded-md p-2 px-4 my-2"
                      onClick={() => handleMenuCategory(menu)}
                      key={menu}
                    >
                      {menu}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="block md:hidden">
              <MenuCategory
                dishData={dishData}
                handleMenuCategory={handleMenuCategory}
                selected={menuCategory}
              />
            </div>

            {dishData.dishes_data[menuCategory].map((data, inx) => {
              if (inx >= initialIndex && inx < currentPage * MAX_DISHES) {
                return (
                  <div
                    className="bg-gray-200 p-4 rounded-md flex flex-row items-center gap-4 justify-between my-2 text-sm md:text-lg"
                    key={data.dish_id}
                  >
                    <div className="flex flex-row gap-4 items-center">
                      <img
                        src={`http://localhost:5000/public/${data.dish_image}`}
                        className="h-32 w-32 rounded-md shadow-lg object-fill"
                      />
                      <div className="flex flex-col gap-2">
                        <div className="font-bold">{data.dish_name}</div>
                        <div className="line-clamp-2">
                          {data.dish_description}
                        </div>
                        <div className="">
                          <b>Price</b>:{data.dish_price}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center text-xs md:flex-row md:text-base">
                      <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button
                          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-md transition-colors"
                          onClick={() => handleUpdateCart(data, -1)}
                        >
                          -
                        </button>
                        <span className="px-2 font-medium">
                          {cart.find((item) => item.dish_id === data.dish_id)
                            ?.quantity || 0}
                        </span>
                        <button
                          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-md transition-colors"
                          onClick={() => handleUpdateCart(data, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="bg-blue-600 p-2 rounded-md text-white whitespace-nowrap overflow-hidden text-ellipsis"
                        onClick={() =>
                          dispatch(
                            addToCart({
                              ...data,
                              quantity: 1,
                              restaurant_id: dishData.restaurant_id,
                              user_id,
                            }),
                          )
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
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
