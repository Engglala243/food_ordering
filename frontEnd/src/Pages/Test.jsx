import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/Counter";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Test = () => {
  const [cartData, setCartData] = useState([]);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);

  const handleNotification = () => {
    toast.success("Cool Notification!");
  };

  const getCartData = () => {
    axios
      .get("http://localhost:5000/cart/1")
      .then((resp) => {
        console.log(resp.data);
        setCartData(resp.data);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center p-4 ">
        <div className="font-bold text-4xl">Test Page!</div>
        <div>Testing redux values</div>
        <div>This is Count: {count}</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className="bg-blue-800 p-2 rounded-md text-white"
          onClick={handleNotification}
        >
          Notification Shit
        </button>
      </div>
      {/* Same as */}
    </>
  );
};

export default Test;
