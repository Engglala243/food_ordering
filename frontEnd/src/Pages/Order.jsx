import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import axios from "axios";
import { data } from "autoprefixer";

function Order() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const [isPaid, setIsPaid] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [itemsTotal, setItemsTotal] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
      paymentData
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
        30 + index * 10
      );
    });

    doc.text(
      `Subtotal: $${calculateSubtotal()}`,
      20,
      30 + cartItems.length * 10 + 10
    );
    doc.text(
      `GST (18%): $${calculateGst()}`,
      20,
      30 + cartItems.length * 10 + 20
    );
    doc.text(
      `Grand Total: $${calculateTotal()}`,
      20,
      30 + cartItems.length * 10 + 30
    );

    doc.save("Final-Bill.pdf");
  };

  const convertDate = (inputTimestamp) => {
    const date = new Date(inputTimestamp);

    const formattedDate = date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return formattedDate;
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    try {
      setLoading(true);
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
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(`Error Fetching order data: ${err}`);
    }
  }, []);

  return (
    <>
      <div className="space-y-4">
        {orderData.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded-md">
            <button
              className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">Order #{index + 1}</span>
                <div className="self-end">{convertDate(item.created_at)}</div>
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
              <div className="p-4 text-gray-700 bg-white">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          No
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Item Name
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Quantity
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Items Price
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {item.dish_data.map((data, inx) => (
                        <tr>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                            {inx + 1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                            {data.dish_name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {data.quantity}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {data.quantity * data.dish_price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tbody>
                    <tr>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                         
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                           
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 self-end">
                            <span className="font-bold">Amount paid:</span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {item.amount_paid}
                          </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Order;
