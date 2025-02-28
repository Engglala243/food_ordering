import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
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
import { Plus } from "lucide-react";
import { AiOutlineDelete } from "react-icons/ai";

const DishSchema = Yup.object().shape({
  dishes: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required("Dish name is required")
        .min(3, "Too short.")
        .max(25, "Too long!"),
      description: Yup.string().required("Description is required"),
      price: Yup.number()
        .required("Price is required")
        .min(0, "Price must be positive"),
      image: Yup.mixed().required("Image is required"),
    }),
  ),
});

const AddDishes = ({ menuId }) => {
  const formik = useFormik({
    initialValues: {
      dishes: [{ name: "", description: "", price: "", image: null }],
    },
    validationSchema: DishSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const access_token = localStorage.getItem("access_token");
      try {
        const formData = new FormData();

        // Add menuId to formData
        formData.append("menuId", menuId);

        // dishes details...
        values.dishes.forEach((dish, index) => {
          formData.append(`dish${index}`, dish.image);
          formData.append(
            `dishData${index}`,
            JSON.stringify({
              name: dish.name,
              description: dish.description,
              price: dish.price,
            }),
          );
        });

        console.log(Array.from(formData.entries()), "<===Entries");

        const response = await axios.post(
          "http://54.211.165.0/api/dishes/add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${access_token}`,
            },
          },
        );

        if (response.data.success) {
          toast.success("Dishes added successfully!");
          resetForm();
        } else {
          toast.error(response.data.message || "Failed to add dishes");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const addDish = () => {
    const dishes = [...formik.values.dishes];
    dishes.push({ name: "", description: "", price: "", image: null });
    formik.setFieldValue("dishes", dishes);
  };

  const removeDish = (index) => {
    const dishes = [...formik.values.dishes];
    dishes.splice(index, 1);
    formik.setFieldValue("dishes", dishes);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const dishes = [...formik.values.dishes];
    dishes[index][name] = value;
    formik.setFieldValue("dishes", dishes);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const dishes = [...formik.values.dishes];
    dishes[index].image = file;
    formik.setFieldValue("dishes", dishes);
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-blue-800 p-2 rounded-md text-white">
        Add Dishes
      </DialogTrigger>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Enter the dish details:</DialogTitle>
          <DialogDescription className="text-black text-left flex">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-2 w-full max-h-[60vh] overflow-y-auto pr-4"
            >
              <div className="space-y-4">
                {formik.values.dishes.map((dish, index) => (
                  <div
                    className="flex flex-col gap-2 bg-gray-100 rounded-md p-2 w-full"
                    key={index}
                  >
                    <div className="w-full">
                      <Label
                        className="font-medium text-md"
                        htmlFor={`dishes.${index}.name`}
                      >
                        Dish Name:
                      </Label>
                      <Input
                        id={`dishes.${index}.name`}
                        name="name"
                        type="text"
                        placeholder="Dish Name..."
                        onChange={(e) => handleChange(e, index)}
                        onBlur={formik.handleBlur}
                        value={dish.name}
                        className={`w-full bg-white ${
                          formik.touched.dishes?.[index]?.name &&
                          formik.errors.dishes?.[index]?.name
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.touched.dishes?.[index]?.name &&
                        formik.errors.dishes?.[index]?.name && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.dishes[index].name}
                          </div>
                        )}
                    </div>
                    <div className="w-full">
                      <Label
                        className="font-medium text-md"
                        htmlFor={`dishes.${index}.description`}
                      >
                        Description:
                      </Label>
                      <Input
                        id={`dishes.${index}.description`}
                        name="description"
                        type="text"
                        placeholder="Description..."
                        onChange={(e) => handleChange(e, index)}
                        onBlur={formik.handleBlur}
                        value={dish.description}
                        className={`w-full bg-white ${
                          formik.touched.dishes?.[index]?.description &&
                          formik.errors.dishes?.[index]?.description
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.touched.dishes?.[index]?.description &&
                        formik.errors.dishes?.[index]?.description && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.dishes[index].description}
                          </div>
                        )}
                    </div>
                    <div className="w-full">
                      <Label
                        className="font-medium text-md"
                        htmlFor={`dishes.${index}.price`}
                      >
                        Price:
                      </Label>
                      <Input
                        id={`dishes.${index}.price`}
                        name="price"
                        type="number"
                        placeholder="Price..."
                        onChange={(e) => handleChange(e, index)}
                        onBlur={formik.handleBlur}
                        value={dish.price}
                        className={`w-full bg-white ${
                          formik.touched.dishes?.[index]?.price &&
                          formik.errors.dishes?.[index]?.price
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formik.touched.dishes?.[index]?.price &&
                        formik.errors.dishes?.[index]?.price && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.dishes[index].price}
                          </div>
                        )}
                    </div>
                    <div className="w-full">
                      <Label
                        className="font-medium text-md"
                        htmlFor={`dishes.${index}.image`}
                      >
                        Image:
                      </Label>
                      <Input
                        id={`dishes.${index}.image`}
                        name="image"
                        type="file"
                        onChange={(e) => handleImageChange(e, index)}
                        class="block w-full text-sm focus:border-none text-slate-500
                            file:mr-4 file:py-2 file:px-4 file:rounded-md
                            file:border-none file:text-sm file:font-semibold
                            file:bg-blue-200 
                            hover:file:bg-blue-300"
                      />
                      {formik.touched.dishes?.[index]?.image &&
                        formik.errors.dishes?.[index]?.image && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.dishes[index].image}
                          </div>
                        )}
                    </div>
                    <div className="w-auto">
                      <button
                        type="button"
                        className="hover:text-red-500 text-xl disabled:opacity-50 disabled:text-gray-600 bg-white p-2 rounded-md"
                        onClick={() => removeDish(index)}
                        disabled={formik.values.dishes.length === 1}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-x-2">
                <button
                  type="button"
                  onClick={addDish}
                  className="bg-gray-100 hover:bg-white flex-grow-0 w-fit rounded-md p-2"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="bg-blue-800 p-2 text-white rounded-md flex-grow-0 w-fit disabled:opacity-50 disabled:bg-blue-400"
                >
                  {formik.isSubmitting ? "Submitting..." : "Submit"}
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
