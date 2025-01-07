import { useDispatch, useSelector } from "react-redux";
import { updateCartQuantity, removeItem } from "../features/CartSlice";
import { useNavigate } from "react-router-dom";
import PayButton from "../Components/PayButton";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const handleUpdateCart = (id, change) => {
    dispatch(
      updateCartQuantity({
        dish_id: id,
        change,
        access_token: localStorage.getItem("access_token"),
      }),
    );
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const calculateTotal = () => {
    const totalAmt = cart
      .reduce((acc, item) => acc + item.dish_price * item.quantity, 0)
      .toFixed(2);
    const gst = parseFloat((totalAmt * 0.18).toFixed(2));
    const total = parseFloat(totalAmt);
    return (total + gst).toFixed(2);
  };

  return (
    <div className="p-4 sm:p-6 mt-24 sm:mt-28 md:mt-20 lg:mt-24">
      <div className="container mx-auto max-w-6xl mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          Your Cart
        </h2>
        {cart.length > 0 ? (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.dish_id}
                className="bg-white rounded-lg shadow-md p-3 sm:p-4 transition-shadow hover:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <img
                    src={`http://localhost:5000/public/${item.dish_image}`}
                    alt={item.dish_name}
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover rounded-md"
                  />
                  <div className="flex-grow sm:text-left">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
                      {item.dish_name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-2 mt-1">
                      {item.dish_description}
                    </p>
                    <p className="text-green-500 font-semibold mt-2">
                      ${item.dish_price}
                    </p>
                    <p className="font-bold text-gray-800">
                      Total: ${(item.dish_price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                      <button
                        className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-md transition-colors"
                        onClick={() => handleUpdateCart(item.dish_id, -1)}
                      >
                        -
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button
                        className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-md transition-colors"
                        onClick={() => handleUpdateCart(item.dish_id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors w-full sm:w-auto"
                      onClick={() => handleRemoveItem(item.dish_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-8 space-y-4">
              <div className="text-right text-xl sm:text-2xl font-bold text-gray-800">
                Total with tax: ${calculateTotal()}
              </div>
              <div className="flex justify-end">
                <PayButton amount={calculateTotal()} />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">Your cart is empty.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
