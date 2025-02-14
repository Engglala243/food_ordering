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

  const handleDownloadInvoice = (order, inx) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Header
    doc.setFontSize(20);
    doc.text("INVOICE", pageWidth / 2, 20, { align: "center" });

    // Invoice details
    doc.setFontSize(10);
    doc.text(`Invoice No: ${inx + 1}`, 20, 35);
    doc.text(`Date: ${convertDate(order.created_at)}`, pageWidth - 60, 35);

    // Table headers
    const columns = ["Sr.", "Item Description", "Qty", "Price", "Total"];
    const columnWidths = [15, 80, 20, 30, 30];
    let startX = 20;
    let startY = 50;

    // Draw table header
    doc.setFillColor(240, 240, 240);
    doc.rect(
      startX,
      startY - 5,
      columnWidths.reduce((a, b) => a + b, 0),
      10,
      "F",
    );
    doc.setFont("helvetica", "bold");

    columns.forEach((header, i) => {
      const x =
        startX +
        (i > 0 ? columnWidths.slice(0, i).reduce((a, b) => a + b, 0) : 0);
      doc.text(header, x, startY);
    });

    // Table content
    startY += 10;
    doc.setFont("helvetica", "normal");

    order.dish_data.forEach((item, index) => {
      const itemTotal = item.quantity * item.dish_price;
      const row = [
        (index + 1).toString(),
        item.dish_name,
        item.quantity.toString(),
        `$${item.dish_price}`,
        `$${itemTotal.toFixed(2)}`,
      ];

      row.forEach((text, i) => {
        const x =
          startX +
          (i > 0 ? columnWidths.slice(0, i).reduce((a, b) => a + b, 0) : 0);
        doc.text(text, x, startY);
      });
      startY += 10;
    });

    // Calculate taxes and totals
    const subtotal = order.amount_paid / 1.18; // Remove 18% GST from total
    const gstAmount = subtotal * 0.18;
    const total = order.amount_paid;

    // Draw line
    const lineY = startY + 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, lineY, pageWidth - 20, lineY);

    // Amount details
    startY += 20;
    const amountX = pageWidth - 60;

    doc.text("Subtotal:", amountX, startY);
    doc.text(`$${subtotal.toFixed(2)}`, pageWidth - 20, startY, {
      align: "right",
    });

    startY += 10;
    doc.text("IGST (18%):", amountX, startY);
    doc.text(`$${gstAmount.toFixed(2)}`, pageWidth - 20, startY, {
      align: "right",
    });

    startY += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Total Amount:", amountX, startY);
    doc.text(`$${total.toFixed(2)}`, pageWidth - 20, startY, {
      align: "right",
    });

    // Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const footerY = doc.internal.pageSize.height - 20;
    doc.text("Thank you for your business!", pageWidth / 2, footerY, {
      align: "center",
    });

    // Save the PDF
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
    <div className="bg-gray-50 px-6 pt-40 pb-20 min-h-screen md:pt-28 md:pb-4">
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
                  <span className="text-sm text-gray-500">
                    {convertDate(item.created_at)}
                  </span>
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
                            <td className="px-4 py-2">
                              ${(dish.quantity * dish.dish_price).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-4 text-right">
                      <span className="font-bold">
                        Total Paid: ${item.amount_paid.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadInvoice(item, index)}
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
