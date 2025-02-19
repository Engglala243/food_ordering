import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const DishSchema = Yup.object().shape({
  name: Yup.string()
    .required("Dish name is required")
    .min(3, "Too short")
    .max(50, "Too long"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Too short")
    .max(500, "Too long"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .min(0, "Price cannot be negative"),
  menu_id: Yup.string().required("Menu selection is required"),
  dish_image: Yup.mixed()
    .required("Image is required")
    .test("fileSize", "File is too large (max 5MB)", (value) =>
      value ? value.size <= MAX_FILE_SIZE : true,
    )
    .test("fileFormat", "Unsupported file format", (value) =>
      value ? SUPPORTED_FORMATS.includes(value.type) : true,
    ),
});

const AddDishes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  let menuData = useSelector((state) => state.menu.menuData);
  const access_token = localStorage.getItem("access_token");

  if (menuData.length > 1) {
    menuData = JSON.parse(menuData);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      menu_id: "",
      dish_image: null,
    },
    validationSchema: DishSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("menu_id", values.menu_id);
        formData.append("dish_image", values.dish_image);

        await axios.post("http://localhost:5000/dishes", formData, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false,
        });

        toast.success("Dish added successfully!");
        resetForm();
        setImagePreview(null);
        setIsOpen(false);
      } catch (error) {
        const errorMsg = error.response?.data?.message;
        if (Array.isArray(errorMsg)) {
          errorMsg.forEach((msg) => toast.error(msg));
        } else {
          toast.error(errorMsg || "Error adding dish");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("dish_image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-800 p-2 rounded-md text-white">
          Add Dish
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Dish</DialogTitle>
          <DialogDescription>
            <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Dish Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-100"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-100"
                  />
                  {formik.touched.price && formik.errors.price && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.price}
                    </div>
                  )}
                </div>

                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-100"
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.description}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="menu_id">Menu Category</Label>
                  <Select
                    onValueChange={(value) =>
                      formik.setFieldValue("menu_id", value)
                    }
                    value={formik.values.menu_id}
                  >
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="Select menu" />
                    </SelectTrigger>
                    <SelectContent>
                      {menuData.map((menu) => (
                        <SelectItem key={menu.menu_id} value={menu.menu_id}>
                          {menu.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formik.touched.menu_id && formik.errors.menu_id && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.menu_id}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Dish Image</Label>
                  <div className="mt-1 flex items-center gap-4">
                    <label className="flex flex-col items-center justify-center w-32 h-32 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 relative">
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              formik.setFieldValue("dish_image", null);
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                          <span className="mt-2 text-sm text-gray-500">
                            Upload Image
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  {formik.touched.dish_image && formik.errors.dish_image && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.dish_image}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    setImagePreview(null);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="bg-blue-800 px-4 py-2 text-white rounded-md disabled:opacity-50 disabled:bg-blue-400"
                >
                  {formik.isSubmitting ? "Adding..." : "Add Dish"}
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddDishes;
