import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import axios from "axios";

function Order() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const [isPaid, setIsPaid] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [orderData, setOrderData] = useState([]);

  const calculateSubtotal = () =>
    cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

  const calculateGst = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal * 0.18).toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const gst = parseFloat(calculateGst());
    return (subtotal + gst).toFixed(2);
  };

  const handleGenerateQrCode = () => {
    const paymentData = `Final Amount (incl. GST): $${calculateTotal()}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      paymentData,
    )}&size=200x200`;
    setQrCode(qrUrl);
  };

  const handlePayment = async () => {
    const amount = calculateTotal() * 100;
    const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";
    const options = {
      key: "Key",
      amount: amount,
      currency: "INR",
      name: "Your Store Name",
      description: "Order Payment",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        alert("Payment Successful!");
        setIsPaid(true);
      },
      prefill: {
        name: "Your Name",
        email: "your-email@example.com",
        contact: "1234567890",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleDownloadBill = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Final Bill", 20, 20);
    doc.setFontSize(12);

    cartItems.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} (x${item.quantity}) - $${item.price} each`,
        20,
        30 + index * 10,
      );
    });

    doc.text(
      `Subtotal: $${calculateSubtotal()}`,
      20,
      30 + cartItems.length * 10 + 10,
    );
    doc.text(
      `GST (18%): $${calculateGst()}`,
      20,
      30 + cartItems.length * 10 + 20,
    );
    doc.text(
      `Grand Total: $${calculateTotal()}`,
      20,
      30 + cartItems.length * 10 + 30,
    );

    doc.save("Final-Bill.pdf");
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    axios
      .get("http://localhost:5000/order", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((resp) => {
        console.log(resp.data.data, "<===This is Order Data");
        setOrderData(resp.data.data);
      })
      .catch((err) => {
        console.log(`Error fetching order data: ${err}`);
      });
  }, []);

  return (
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
  );
}

export default Order;
