import "./style.css";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { document } from "postcss";

const Dashboard = () => {
  const [forms, setForms] = useState([
    {
      id: 1,
      name: "",
      description: "",
      price: "",
      image: null,
    },
  ]);

  const formik = useFormik({
    initialValues: {
      menu_name: "",
      dish_name: "",
      dish_description: "",
      dish_price: "",
    },
    validationSchema: Yup.object().shape({
      menu_name: Yup.string()
        .required("Menu Name is required!")
        .min(3, "Too short.")
        .max(25, "Too long!"),
      dish_name: Yup.string()
        .required("Dish Name is required!")
        .min(3, "Too short.")
        .max(25, "Too long!"),
      dish_description: Yup.string()
        .required("Dish Description is required!")
        .min(3, "Too short.")
        .max(25, "Too long!"),
      dish_price: Yup.number()
        .positive("Only can be a positive value")
        .integer("Only integer value")
        .required("Please enter the dish price!"),
      images: Yup.mixed()
        .test("fileSize", "Image size is too large", (value) => {
          if (!value) return true; // Skip if no file
          return value.size <= 2 * 1024 * 1024; // 5MB limit
        })
        .test("fileType", "Unsupported file format", (value) => {
          if (!value) return true; // Skip if no file
          return (value) =>
            ["image/jpeg", "image/png", "image/gif"].includes(value.type);
        }),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Your Values ====>\n", values);
        resetForm();
      } catch (error) {
        console.error("Upload failed", error);
      }
    },
  });

  const handleAddMore = () => {
    const newForm = {
      id: forms.length + 1,
      name: "",
      description: "",
      price: "",
      image: null,
    };
    setForms([...forms, newForm]);
  };

  return (
    <>
      <div className="m-16 flex flex-col gap-3">
        Dashboard
        <button className="w-32 bg-blue-800 text-white rounded-md p-2">
          Add a item
        </button>
        <form
          action=""
          encType="multipart/form-data"
          className="flex flex-col"
          onSubmit={formik.handleSubmit}
        >
          <label className="my-label" htmlFor="">
            Menu Name:
          </label>
          <input
            className="my-input"
            type="text"
            placeholder="enter the menu name..."
            {...formik.getFieldProps("menu_name")}
          />
          {formik.touched.menu_name && formik.errors.menu_name ? (
            <div className="error-div">{formik.errors.menu_name}</div>
          ) : null}
          <div className="text-xl font-bold mt-2">Dishes details...</div>
          {forms.map((form) => (
            <>
              <hr className="w-96" />
              <div className="font-bold">Dish {form.id}</div>
              <label className="my-label" htmlFor="">
                Dish Name:
              </label>
              <input
                className="my-input"
                type="text"
                placeholder="enter the dish name..."
                {...formik.getFieldProps("dish_name")}
              />
              {formik.touched.dish_name && formik.errors.dish_name ? (
                <div className="error-div">{formik.errors.dish_name}</div>
              ) : null}
              <label className="my-label" htmlFor="">
                Description:
              </label>
              <input
                className="my-input"
                type="text"
                placeholder="enter the description..."
                {...formik.getFieldProps("dish_description")}
              />
              {formik.touched.dish_description &&
              formik.errors.dish_description ? (
                <div className="error-div">
                  {formik.errors.dish_description}
                </div>
              ) : null}
              <label className="my-label" htmlFor="">
                Price:
              </label>
              <input
                className="my-input"
                type="number"
                placeholder="enter the price..."
                {...formik.getFieldProps("dish_price")}
              />
              {formik.touched.dish_price && formik.errors.dish_price ? (
                <div className="error-div">{formik.errors.dish_price}</div>
              ) : null}
              <label className="my-label" htmlFor="">
                Item image:
              </label>
              <input
                className="my-file-input"
                type="file"
                placeholder="choose files"
                {...formik.getFieldProps("images")}
              />
              {formik.touched.images && formik.errors.images ? (
                <div className="error-div">{formik.errors.images}</div>
              ) : null}
            </>
          ))}
          <div className="add-more-btn" onClick={handleAddMore}>
            Add More
          </div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
