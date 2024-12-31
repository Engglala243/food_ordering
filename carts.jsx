const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
];

let cart = [];

// get request
app.get("/products", (req, res) => {
  res.json(products);
});

// Add product to cart : post request
app.post("/cart", (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const cartItem = cart.find((item) => item.productId === productId);
  if (cartItem) {
    // quantity ++
    cartItem.quantity += quantity; 
  } else {
    cart.push({ productId, quantity });
  }

  res.json({ message: "Product added to cart", cart });
});

// View cart : get request 
app.get("/cart", (req, res) => {
  const detailedCart = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...item,
      name: product.name,
      price: product.price,
      total: product.price * item.quantity,
    };
  });

  const totalPrice = detailedCart.reduce((sum, item) => sum + item.total, 0);

  res.json({ cart: detailedCart, totalPrice });
});

// Remove itrm from cart : delete request
app.post("/cart/:productId", (req, res) => {
  const productId = parseInt(req.params.productId, 10);
  cart = cart.filter((item) => item.productId !== productId);

  res.json({ message: "Product removed from cart", cart });
});

// Update item quantity in cart : put request
app.post("/cart", (req, res) => {
  const { productId, quantity } = req.body;

  const cartItem = cart.find((item) => item.productId === productId);
  if (!cartItem) {
    return res.status(404).json({ message: "Product not in cart" });
  }

  cartItem.quantity = quantity;
  if (cartItem.quantity <= 0) {
    // quantity --
    cart = cart.filter((item) => item.productId !== productId); 
  }

  res.json({ message: "Cart updated", cart });
});

app.listen(3000, () => {
  console.log("Done");
});


<div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
<div className="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-8">
  <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
    Order Summary
  </h2>

  {cartItems.length > 0 ? (
    <>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div>
              <h4 className="text-lg font-bold text-gray-800">
                {item.name}
              </h4>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-sm text-gray-600">
                Quantity: {item.quantity} | Price: ${item.price}
              </p>
            </div>
            <div className="text-lg font-bold text-gray-800">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-6 space-y-2">
        <p className="text-xl font-semibold text-gray-800">
          Subtotal: ${calculateSubtotal()}
        </p>
        <p className="text-xl font-semibold text-gray-800">
          GST (18%): ${calculateGst()}
        </p>
        <p className="text-2xl font-bold text-gray-800">
          Grand Total: ${calculateTotal()}
        </p>
      </div>

      {!isPaid ? (
        <div className="text-center mt-8">
          {!qrCode ? (
            <button
              className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition"
              onClick={handleGenerateQrCode}
            >
              Generate QR Code for Payment
            </button>
          ) : (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800">
                Scan to Pay
              </h3>
              <img
                src={qrCode}
                alt="QR Code"
                className="mx-auto mt-4 shadow-lg border-2 border-gray-300 rounded-lg"
              />
              <button
                className="bg-green-500 text-white py-3 px-6 rounded-md mt-4 hover:bg-green-600 transition"
                onClick={handlePayment}
              >
                Confirm Payment via Razorpay
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center mt-8">
          <h3 className="text-lg font-bold text-green-500">
            Payment Successful!
          </h3>
          <button
            className="bg-blue-600 text-white py-3 px-6 rounded-md mt-4 hover:bg-blue-700 transition"
            onClick={handleDownloadBill}
          >
            Download Final Bill
          </button>
        </div>
      )}
    </>
  ) : (
    <div className="text-center text-gray-600">
      <p className="text-xl font-bold">No items in your cart.</p>
      <p className="text-sm">Please add items to place an order.</p>
    </div>
  )}
</div>
</div>

// ************************************* Order.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import axios from "axios";

function Order() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const [orderData, setOrderData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const convertDate = (inputTimestamp) => {
    const date = new Date(inputTimestamp);
    return date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDownloadInvoice = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id || "N/A"}`, 20, 30);
    doc.text(`Order Date: ${convertDate(order.created_at)}`, 20, 40);

    doc.text("Items:", 20, 50);
    order.dish_data.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.dish_name} (x${item.quantity}) - $${item.dish_price.toFixed(2)}`,
        20,
        60 + index * 10
      );
    });

    const totalY = 60 + order.dish_data.length * 10 + 10;
    doc.text(`Amount Paid: $${order.amount_paid.toFixed(2)}`, 20, totalY);

    doc.save(`Invoice_Order_${order.id || "N/A"}.pdf`);
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      const access_token = localStorage.getItem("access_token");
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/order", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setOrderData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching order data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : orderData.length > 0 ? (
        <div className="space-y-4">
          {orderData.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-md">
              <button
                className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">Order #{index + 1}</span>
                  <span className="text-sm text-gray-500">{convertDate(item.created_at)}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-white">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-gray-900">No</th>
                          <th className="px-4 py-2 text-gray-900">Item Name</th>
                          <th className="px-4 py-2 text-gray-900">Quantity</th>
                          <th className="px-4 py-2 text-gray-900">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.dish_data.map((dish, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-2">{idx + 1}</td>
                            <td className="px-4 py-2">{dish.dish_name}</td>
                            <td className="px-4 py-2">{dish.quantity}</td>
                            <td className="px-4 py-2">${(dish.quantity * dish.dish_price).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-4 text-right">
                      <span className="font-bold">Total Paid: ${item.amount_paid.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadInvoice(item)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Download Invoice
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default Order;
