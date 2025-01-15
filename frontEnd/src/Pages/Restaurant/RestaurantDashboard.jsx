import { Settings, SquareMenu, SquareUserRound, ChartBar } from "lucide-react";
import { useState } from "react";
import { X, Plus, Trash, Image as ImageIcon } from "lucide-react";
import { Formik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";

const dishValidationSchema = Yup.object().shape({
  dishes: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .required("Dish name is required")
          .min(2, "Name too short")
          .max(50, "Name too long"),
        price: Yup.number()
          .required("Price is required")
          .min(0, "Price must be positive")
          .max(10000, "Price too high"),
        description: Yup.string()
          .required("Description is required")
          .min(10, "Description too short")
          .max(500, "Description too long"),
        dish_image: Yup.mixed()
          .required("Image is required")
          .test("fileSize", "File too large", (value) => {
            if (!value) return true;
            return value.size <= 10000000; // 10MB
          })
          .test("fileType", "Unsupported file type", (value) => {
            if (!value) return true;
            return ["image/jpeg", "image/png", "image/gif"].includes(
              value.type,
            );
          }),
      }),
    )
    .min(1, "At least one dish is required"),
});

const initialValues = {
  dishes: [
    {
      id: 1,
      name: "",
      price: "",
      description: "",
      dish_image: null,
    },
  ],
};

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form submitted with values:", values);
    setSubmitting(false);
    toggleModal();
  };

  const handleImageChange = (setFieldValue, dishIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue(`dishes.${dishIndex}.dish_image`, file);
    }
  };

  return (
    <div className="">
      <button
        onClick={toggleModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Add a Menu
      </button>

      {isOpen && (
        <div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4">Add Menu Items</h2>

            <Formik
              initialValues={initialValues}
              validationSchema={dishValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form className="space-y-6">
                  <FieldArray name="dishes">
                    {({ push, remove }) => (
                      <>
                        {values.dishes.map((dish, index) => (
                          <div
                            key={dish.id}
                            className="p-4 border rounded-lg relative"
                          >
                            <div className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-600">
                              Dish {index + 1}
                            </div>

                            {values.dishes.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                              >
                                <Trash size={20} />
                              </button>
                            )}

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Item Name
                                </label>
                                <Field
                                  name={`dishes.${index}.name`}
                                  className="w-full border border-gray-300 rounded-md p-2"
                                  placeholder="Enter item name"
                                />
                                {errors.dishes?.[index]?.name &&
                                  touched.dishes?.[index]?.name && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.dishes[index].name}
                                    </div>
                                  )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Price
                                </label>
                                <Field
                                  type="number"
                                  name={`dishes.${index}.price`}
                                  className="w-full border border-gray-300 rounded-md p-2"
                                  placeholder="Enter price"
                                />
                                {errors.dishes?.[index]?.price &&
                                  touched.dishes?.[index]?.price && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.dishes[index].price}
                                    </div>
                                  )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Description
                                </label>
                                <Field
                                  as="textarea"
                                  name={`dishes.${index}.description`}
                                  className="w-full border border-gray-300 rounded-md p-2"
                                  rows={3}
                                  placeholder="Enter item description"
                                />
                                {errors.dishes?.[index]?.description &&
                                  touched.dishes?.[index]?.description && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.dishes[index].description}
                                    </div>
                                  )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Dish Image
                                </label>
                                <div className="mt-1 flex items-center">
                                  <label className="w-full flex justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                                    <div className="space-y-1 text-center">
                                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                      <div className="flex text-sm text-gray-600">
                                        <span>
                                          {values.dishes[index].dish_image
                                            ? values.dishes[index].dish_image
                                                .name
                                            : "Upload dish image"}
                                        </span>
                                        <input
                                          type="file"
                                          className="sr-only"
                                          accept="image/*"
                                          onChange={(e) =>
                                            handleImageChange(
                                              setFieldValue,
                                              index,
                                              e,
                                            )
                                          }
                                        />
                                      </div>
                                      <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                      </p>
                                    </div>
                                  </label>
                                </div>
                                {errors.dishes?.[index]?.dish_image &&
                                  touched.dishes?.[index]?.dish_image && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {errors.dishes[index].dish_image}
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() =>
                            push({
                              id:
                                values.dishes[values.dishes.length - 1].id + 1,
                              name: "",
                              price: "",
                              description: "",
                              dish_image: null,
                            })
                          }
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center gap-2"
                        >
                          <Plus size={20} />
                          Add Another Dish
                        </button>
                      </>
                    )}
                  </FieldArray>

                  <div className="flex justify-end space-x-2 pt-4">
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isSubmitting ? "Saving..." : "Save All Dishes"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

const Customers = () => {
  return (
    <>
      <div className="">Customers</div>
    </>
  );
};

const Stats = () => {
  return (
    <>
      <div className="">Stats</div>
    </>
  );
};

const MySettings = () => {
  return (
    <>
      <div className="">Settings</div>
    </>
  );
};

const MainSection = ({ childComp }) => {
  return (
    <>
      <div className="bg-gray-200 w-full rounded-md p-4">{childComp}</div>
    </>
  );
};

const RestaurantDashboard = () => {
  const [childComp, setChildComp] = useState(<Menu />);

  return (
    <>
      <div className="flex flex-row pt-36 px-4 gap-2">
        <div className="flex flex-col gap-2 bg-gray-200 rounded-md p-4">
          <div
            className="flex flex-row gap-1 text-base cursor-pointer"
            onClick={() => setChildComp(<Menu />)}
          >
            <SquareMenu />
            Menu
          </div>
          <div
            className="flex flex-row gap-1 text-base cursor-pointer"
            onClick={() => setChildComp(<Customers />)}
          >
            <SquareUserRound />
            Customers
          </div>
          <div
            className="flex flex-row gap-1 text-base cursor-pointer"
            onClick={() => setChildComp(<Stats />)}
          >
            <ChartBar />
            Stats
          </div>
          <div
            className="flex flex-row gap-1 text-base cursor-pointer"
            onClick={() => setChildComp(<MySettings />)}
          >
            <Settings />
            Settings
          </div>
        </div>
        <MainSection childComp={childComp} />
      </div>
    </>
  );
};

export default RestaurantDashboard;
