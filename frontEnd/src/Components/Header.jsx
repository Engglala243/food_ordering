import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Logo from "../assets/images/logo.png";
import QrScanner from "qr-scanner";
import { FaQrcode, FaBarcode, FaCamera, FaTimes } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [scannerMode, setScannerMode] = useState("qr");
  const videoRef = useRef(null);
  const [qrScanner, setQrScanner] = useState(null);

  const startScanner = async (mode) => {
    setScannerMode(mode);
    setShowScanner(true);

    if (mode === "qr" || mode === "barcode") {
      const scanner = new QrScanner(
        videoRef.current,
        (result) => {
          console.log("Scanned result:", result.data);
          handleScanResult(result.data, mode);
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: "environment",
        }
      );
      setQrScanner(scanner);
      await scanner.start();
    }
  };

  const handleScanResult = (data, mode) => {
    switch (mode) {
      case "qr":
        navigate(`/menu/${data}`);
        break;
        navigate(`/product/${data}`);
        break;
      case "image":
        navigate(`/search?image=${data}`);
        break;
      default:
        break;
    }
    stopScanner();
  };

  const stopScanner = () => {
    if (qrScanner) {
      qrScanner.stop();
      qrScanner.destroy();
      setQrScanner(null);
    }
    setShowScanner(false);
  };

  return (
    <>
      <Container fluid className="bg-[#46a679]">
        <div className="flex justify-center text-white p-0.5 text-xs md:text-sm text-center">
          Enjoy Yummy Licious Fast Food!
        </div>
      </Container>
      <div className="bg-transparent backdrop-blur-md shadow-md">
        <Container fluid>
          <Navbar expand="lg" className="p-1">
            <Navbar.Brand
              onClick={() => navigate("/")}
              className="flex items-center cursor-pointer"
            >
              <img
                alt="Logo"
                src={Logo}
                width="35"
                height="35"
                className="d-inline-block align-top"
              />
              <span className="ml-2 text-lg font-bold text-gray-800">
                We-Menu
              </span>
            </Navbar.Brand>

            <div className="flex-grow flex justify-center mx-4">
              <InputGroup className="w-full max-w-md">
                <FormControl
                  placeholder="Search the hotel"
                  aria-label="Search"
                  aria-describedby="search-button"
                  className="rounded-l-md border border-gray-300"
                />
                <Button
                  variant="outline-secondary"
                  id="search-button"
                  className="rounded-r-md bg-[#46a679] text-white"
                >
                  Search
                </Button>
              </InputGroup>
            </div>

            <div className="relative flex items-center">
              <button
                onClick={() => setShowScanner(!showScanner)}
                className="p-1 bg-gray-200 mr-3 rounded-full hover:bg-gray-300 focus:outline-none"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/search--v1.png"
                  alt="Scanner"
                  width="30"
                  height="30"
                  className="d-inline-block align-middle"
                />
              </button>
            </div>
          </Navbar>

          {showScanner && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Smart Scanner</h3>
                  <button
                    onClick={stopScanner}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>

                <div className="flex justify-around mb-4">
                  <button
                    onClick={() => startScanner("qr")}
                    className={`flex flex-col items-center p-3 rounded-lg ${
                      scannerMode === "qr" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <FaQrcode size={24} />
                    <span className="mt-1">QR Code</span>
                  </button>
                  <button
                    onClick={() => startScanner("barcode")}
                    className={`flex flex-col items-center p-3 rounded-lg ${
                      scannerMode === "barcode" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <FaBarcode size={24} />
                    <span className="mt-1">Barcode</span>
                  </button>
                  <button
                    onClick={() => startScanner("image")}
                    className={`flex flex-col items-center p-3 rounded-lg ${
                      scannerMode === "image" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <FaCamera size={24} />
                    <span className="mt-1">Image</span>
                  </button>
                </div>

                <div className="w-full aspect-square bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                  {scannerMode === "qr" && "Point your camera at a QR code"}
                  {scannerMode === "barcode" &&
                    "Align the barcode within the frame"}
                  {scannerMode === "image" && "Take a photo of the item"}
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default Header;
