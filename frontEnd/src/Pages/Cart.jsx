import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (id, change) => {
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
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.dish_id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleBuyNow = () => {
    setCart([]);
    localStorage.removeItem("cart");
    alert("Thank you for your purchase!");
  };

  const calculateTotal = () =>
    cart
      .reduce((acc, item) => acc + item.dish_price * item.quantity, 0)
      .toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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
                      Total: ${item.dish_price * item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-300 px-2 py-1 rounded-md mr-2"
                      onClick={() => updateQuantity(item.dish_id, -1)}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="bg-gray-300 px-2 py-1 rounded-md ml-2"
                      onClick={() => updateQuantity(item.dish_id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-red-500 text-white py-1 px-4 rounded-md ml-4"
                      onClick={() => removeItem(item.dish_id)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-right text-xl font-bold text-gray-800">
              Grand Total: ${calculateTotal()}
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
