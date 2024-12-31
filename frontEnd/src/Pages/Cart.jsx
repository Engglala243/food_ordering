import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartQuantity, removeItem } from "../features/CartSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleUpdateCart = (id, change) => {
    const updatedCart = cart.map((item) => {
      if (item.dish_id === id) {
        const newQuantity = item.quantity + change;
        return {
          ...item,
          quantity: newQuantity > 0 ? newQuantity : 1,
        };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    dispatch(updateCartQuantity({ dish_id: id, change }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    const updatedCart = cart.filter((item) => item.dish_id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleBuyNow = async () => {
    const access_token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");
    const amount_paid = calculateTotal();

    await axios
      .post(
        "http://localhost:5000/order/insert",
        { cart_data: cart, user_id: user_id, amount_paid },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then((resp) => {
        toast.success("Order successful");
        console.log("Order inserted successful", resp.data);
      });

    setCart([]);
    localStorage.removeItem("cart");
    // alert("Thank you for your purchase!");
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
    <div className="p-6 mt-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>
        {cart.length > 0 ? (
          <div>
            {cart.map((item) => (
              <div
                key={item.dish_id}
                className="bg-white rounded-lg shadow-md p-4 mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={`http://localhost:5000/public/${item.dish_image}`}
                    alt={item.dish_name}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold">{item.dish_name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.dish_description}
                    </p>
                    <p className="text-green-500 font-semibold">
                      ${item.dish_price}
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      Total: ${(item.dish_price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-300 px-2 py-1 rounded-md mr-2"
                      onClick={() => handleUpdateCart(item.dish_id, -1)}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="bg-gray-300 px-2 py-1 rounded-md ml-2"
                      onClick={() => handleUpdateCart(item.dish_id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-red-500 text-white py-1 px-4 rounded-md ml-4"
                      onClick={() => handleRemoveItem(item.dish_id)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-right text-xl font-bold text-gray-800">
              Total with tax: ${calculateTotal()}
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-md mt-4"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
