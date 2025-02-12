import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadMenu } from "@/features/MenuSlice";

const AddMenu = () => {
  const [menuData, setMenuData] = useState([]);
  const access_token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const menuLoaded = useSelector((state) => state.menu.menuLoaded);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Menu name is required")
        .min(3, "Too short.")
        .max(25, "Too long!"),
    }),
    onSubmit: (values, { resetForm }) => {
      axios
        .post(
          "http://192.168.1.18:5000/menu",
          { name: values.name },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
            withCredentials: false,
          },
        )
        .then((resp) => {
          console.log(resp, "<===Axios response");
          resetForm();
        });
    },
  });

  const fetchMenuData = () => {
    axios
      .get("http://192.168.1.18:5000/menu", {
        headers: {
          Authorization: `Bearer: ${access_token}`,
        },
      })
      .then((resp) => {
        setMenuData(resp.data.data);
        dispatch(loadMenu());
        console.log(resp.data.data, "<===this response");
      })
      .catch((err) => {
        console.log(`Axios Error: ${err}`);
      });
  };

  useEffect(() => {
    if (!menuLoaded) {
      fetchMenuData();
    }
  }, [menuLoaded]);

  return (
    <>
      <div></div>
      <Dialog>
        <DialogTrigger className="bg-blue-800 p-2 rounded-md text-white">
          Open
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter the menu name:</DialogTitle>
            <DialogDescription className="text-black text-left">
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-2 content-center"
              >
                <input
                  placeholder="menu name..."
                  className="bg-gray-200 p-1 text-center"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="error-div">{formik.errors.name}</div>
                ) : null}
                <button
                  type="submit"
                  className="bg-blue-800 p-2 rounded-md text-white"
                >
                  Submit
                </button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddMenu;
