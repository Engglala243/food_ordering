import { useState, useEffect } from "react";

function TestComp() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocationByIP = async () => {
      try {
        // Using a free IP geolocation API
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        setCity(data.city);
        setLoading(false);
      } catch (err) {
        setError("Failed to get location data");
        setLoading(false);
      }
    };

    getLocationByIP();
  }, []);

  if (loading) return <p>Loading location...</p>;
  if (error) return <p>Error: {error}</p>;

  return <p className="my-32">Your city: {city}</p>;
}

export default TestComp;
