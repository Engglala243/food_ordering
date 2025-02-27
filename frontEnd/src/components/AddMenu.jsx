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
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import AddDishes from "./AddDishes";

// Define the validation schema
const MenuSchema = Yup.object().shape({
  menu_names: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required("Menu name is required")
        .min(3, "Too short.")
        .max(25, "Too long!"),
    }),
  ),
});

const AddMenu = () => {
  let menuData = useSelector((state) => state.menu.menuData);
  const access_token = localStorage.getItem("access_token");
  const [menuOne, setMenuOne] = useState(true);

  if (menuData.length > 1) {
    menuData = JSON.parse(menuData);
  }

  const formik = useFormik({
    initialValues: {
      menu_names: [{ name: "" }],
    },
    validationSchema: MenuSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      console.log(values, "<===these are values");
      try {
        const response = await axios.post("http://18.205.28.19/menu", values, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          withCredentials: false,
        });
        console.log(response, "<===Axios response");
        resetForm();
      } catch (error) {
        error.response.data.message.map((msg) => {
          toast.error(msg);
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const addMenu = () => {
    const menu_names = [...formik.values.menu_names];
    if (menu_names.length === 1) {
      setMenuOne(false);
    }
    menu_names.push({ name: "" });
    formik.setFieldValue("menu_names", menu_names);
  };

  const removeMenu = (index) => {
    const menu_names = [...formik.values.menu_names];
    menu_names.splice(index, 1);

    if (menu_names.length > 0) {
      formik.setFieldValue("menu_names", menu_names);
    }
    if (menu_names.length === 1) {
      setMenuOne(true);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const menu_names = [...formik.values.menu_names];
    menu_names[index].name = value;
    formik.setFieldValue("menu_names", menu_names);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="bg-blue-800 p-2 rounded-md text-white">
          Add Menu
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter the menu name:</DialogTitle>
            <DialogDescription className="text-black text-left flex">
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-2 w-full"
              >
                {formik.values.menu_names.map((menu, index) => (
                  <div className="flex flex-row w-full" key={index}>
                    <div className="w-full">
                      <Label
                        className="font-medium text-md"
                        htmlFor={`menu_names.${index}.name`}
                      >
                        Category Name:
                      </Label>
                      <div className="flex flex-row items-center gap-2">
                        <Input
                          id={`menu_names.${index}.name`}
                          name={`menu_names.${index}.name`}
                          type="text"
                          placeholder="Menu Name..."
                          onChange={(e) => handleChange(e, index)}
                          onBlur={formik.handleBlur}
                          value={menu.name}
                          className={`w-full bg-gray-100 hover:bg-gray-200 ${
                            formik.touched.menu_names?.[index]?.name &&
                            formik.errors.menu_names?.[index]?.name
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        <div className="w-auto">
                          <button
                            type="button"
                            className="text-xl disabled:opacity-50 disabled:text-gray-600"
                            onClick={() => removeMenu(index)}
                            disabled={menuOne}
                          >
                            <AiOutlineDelete />
                          </button>
                        </div>
                      </div>
                      {formik.touched.menu_names?.[index]?.name &&
                        formik.errors.menu_names?.[index]?.name && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.menu_names[index].name}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMenu}
                  className="bg-gray-100 hover:bg-gray-200 flex-grow-0 w-fit rounded-md p-1"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="bg-blue-800 p-1 text-white rounded-md flex-grow-0 w-fit disabled:opacity-50 disabled:bg-blue-400"
                >
                  {formik.isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Table className="my-4">
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
                <AddDishes menuId={data.menu_id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AddMenu;
