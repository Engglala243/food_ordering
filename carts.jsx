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