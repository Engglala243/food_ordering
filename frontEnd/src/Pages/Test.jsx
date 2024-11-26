import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/Counter";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Test = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);

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
      </div>
    </>
  );
};

export default Test;
