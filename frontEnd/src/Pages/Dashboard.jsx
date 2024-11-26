import "./style.css";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { document } from "postcss";
import Sidebar from "../Components/Sidebar";
const Dashboard = ({ headingName }) => {
  return (
    <>
      <div className="m-16 flex flex-row gap-3">
        <div>
          <Sidebar />
        </div>
        <div className="flex flex-col bg-gray-300 rounded-md p-4 w-full gap-2">
          <div className="text-2xl">Dashboard</div>
          <button className="bg-blue-700 w-28 text-xl p-1 rounded-md text-white">
            Add Item
          </button>
        </div>
      </div>
      ;
    </>
  );
};

export default Dashboard;
