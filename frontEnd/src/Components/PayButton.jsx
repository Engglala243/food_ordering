import axios from "axios";
import { useState } from "react";

const PayButton = ({ amount }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (amount) => {
    const access_token = localStorage.getItem("access_token");
    try {
      setLoading(true);
      setError(null);

      const scriptLoaded = await loadScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay SDK failed to load");
      }

      // Create order
      const { data: order } = await axios.post(
        "http://localhost:5000/payment/create-order",
        {
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      const options = {
        key: import.meta.env.RAZORPAY_API_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const { data } = await axios.post(
              "http://localhost:5000/payment/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_amount: order.amount,
              },
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              },
            );

            if (data.verified) {
              alert("Payment successful!");
              // Handle successful payment (e.g., update UI, redirect, etc.)
            }
          } catch (err) {
            console.error(err);
            setError("Payment verification failed");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={() => handlePayment(amount)}
      disabled={loading}
      className={`w-auto py-2 px-4 rounded font-semibold text-white 
            ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} 
            transition duration-200`}
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
};

export default PayButton;
