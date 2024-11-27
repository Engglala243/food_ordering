import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RestaurantMenu = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic cheese pizza with fresh basil.",
      price: 12.99,
      image: "https://th.bing.com/th/id/OIP.mrq9EI-sRaPx0JsrH87J3wHaHa?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with Caesar dressing.",
      price: 9.99,
      image: "https://th.bing.com/th/id/OIP.8UagT3WWGxruvIOqJTCPeQHaE8?rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      name: "Spaghetti Carbonara",
      description: "Pasta with creamy sauce and pancetta.",
      price: 14.99,
      image: "https://thestayathomechef.com/wp-content/uploads/2020/03/Pasta-Carbonara-2-3-scaled.jpg",
    },
  ];

  const addToCart = (item) => {
    const updatedCart = [...cart, { ...item, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); 
  };

  const navigateToCart = () => {
    navigate("/restaurant/cart");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Restaurant Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="text-lg font-semibold text-green-500 mb-4">
                  ${item.price.toFixed(2)}
                </div>
                <div className="flex justify-between">
                  <button
                    className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition"
                    onClick={() => buyNow(item)}
                  >
                    Buy Now
                  </button>
                  <button
                    className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition"
                    onClick={navigateToCart}
                  >
                    Go to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
