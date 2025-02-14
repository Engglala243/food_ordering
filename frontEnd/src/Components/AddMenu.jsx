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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const AddMenu = () => {
  const menuData = JSON.parse(useSelector((state) => state.menu.menuData));
  const access_token = localStorage.getItem("access_token");

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
          "http://localhost:5000/menu",
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

  console.log(typeof menuData);

  return (
    <>
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

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.No.</TableHead>
            <TableHead>Category Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuData.map((data, inx) => (
            <TableRow key={inx + 100}>
              <TableCell className="font-medium">{inx + 1}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger>
                    <Pencil />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AddMenu;
