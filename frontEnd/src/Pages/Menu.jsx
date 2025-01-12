import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { addToCart, updateCartQuantity } from "../features/CartSlice";
import Spinner from "../Components/Spinner";
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

  // Existing functions remain the same
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
    if (cart.find((item) => item.dish_id === data.dish_id)) {
      dispatch(
        updateCartQuantity({
          dish_id: data.dish_id,
          change,
          access_token: localStorage.getItem("access_token"),
        }),
      );
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
    if (pageAction === "next") {
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
        <div className="min-h-screen bg-gray-50 pt-32 md:pt-24">
          <div className="container px-4 md:px-6 py-4 pb-10 mx-auto">
            {/* Restaurant Info */}
            <div className="bg-white rounded-lg p-4 md:p-6 mb-6 md:mb-8 border-l-4 border-[#46a679] max-w-4xl mx-auto">
              <h1 className="text-xl md:text-3xl font-bold text-gray-800">
                {dishData.restaurant_name}
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                {dishData.restaurant_address}
              </p>
            </div>

            {/* Category Navigation */}
            <div className="max-w-4xl mx-auto">
              <div className="hidden md:flex flex-wrap gap-2 mb-8">
                {Object.keys(dishData.dishes_data).map((menu) => (
                  <button
                    key={menu}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        menuCategory === menu
                          ? "bg-[#46a679] text-white"
                          : "bg-white text-gray-700 hover:bg-[#e8f5ef] hover:text-[#46a679] border border-gray-100"
                      }`}
                    onClick={() => handleMenuCategory(menu)}
                  >
                    {menu}
                  </button>
                ))}
              </div>

              <div className="block md:hidden mb-6">
                <MenuCategory
                  dishData={dishData}
                  handleMenuCategory={handleMenuCategory}
                  selected={menuCategory}
                />
              </div>

              {/* Menu Items */}
              <div className="space-y-4 md:space-y-6">
                {dishData.dishes_data[menuCategory].map((data, inx) => {
                  if (inx >= initialIndex && inx < currentPage * MAX_DISHES) {
                    return (
                      <div
                        key={data.dish_id}
                        className="bg-white rounded-lg border border-gray-100 overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Image */}
                          <div className="w-full md:w-48 h-48 md:h-40 flex-shrink-0">
                            <img
                              src={`http://localhost:5000/public/${data.dish_image}`}
                              className="w-full h-full object-cover"
                              alt={data.dish_name}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-2 mb-1">
                                <h3 className="text-base md:text-lg font-semibold text-gray-800">
                                  {data.dish_name}
                                </h3>
                                <span className="text-base md:text-lg font-semibold text-[#46a679] whitespace-nowrap">
                                  ₹{data.dish_price}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                {data.dish_description}
                              </p>
                            </div>

                            <div className="flex justify-between gap-2 flex-wrap">
                              {/* Quantity Controls */}
                              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100">
                                <button
                                  className="w-8 h-8 flex items-center justify-center text-[#46a679]"
                                  onClick={() => handleUpdateCart(data, -1)}
                                >
                                  −
                                </button>
                                <span className="w-8 text-center text-sm font-medium">
                                  {cart.find(
                                    (item) => item.dish_id === data.dish_id,
                                  )?.quantity || 0}
                                </span>
                                <button
                                  className="w-8 h-8 flex items-center justify-center text-[#46a679]"
                                  onClick={() => handleUpdateCart(data, 1)}
                                >
                                  +
                                </button>
                              </div>

                              {/* Add to Cart */}
                              <button
                                className="w-auto bg-[#46a679] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3d8f68] transition-colors"
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
                        </div>
                      </div>
                    );
                  }
                })}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8 gap-2">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white text-[#46a679] border border-[#46a679] hover:bg-[#e8f5ef]"
                  }`}
                  onClick={() => handlePage("prev")}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="flex items-center justify-center bg-white text-gray-700 px-4 py-2 rounded-lg border text-sm font-medium min-w-[40px]">
                  {currentPage}
                </span>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    currentPage === Math.ceil(menuCategoryLength / MAX_DISHES)
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white text-[#46a679] border border-[#46a679] hover:bg-[#e8f5ef]"
                  }`}
                  onClick={() => handlePage("next")}
                  disabled={
                    currentPage === Math.ceil(menuCategoryLength / MAX_DISHES)
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
