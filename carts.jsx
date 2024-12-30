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