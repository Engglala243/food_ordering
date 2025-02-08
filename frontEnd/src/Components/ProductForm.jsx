import React from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";

const ProductForm = () => {
  // Initial form values
  const initialValues = {
    products: [
      {
        name: "",
        description: "",
        price: "",
        image: null,
        imagePreview: "",
      },
    ],
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    products: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .required("Product name is required")
          .min(2, "Name too short"),
        description: Yup.string()
          .required("Description is required")
          .min(10, "Description too short"),
        price: Yup.number()
          .required("Price is required")
          .positive("Price must be positive"),
        image: Yup.mixed()
          .required("Image is required")
          .test("fileSize", "File too large", (value) => {
            if (!value) return true;
            return value.size <= 2000000; // 2MB limit
          })
          .test("fileFormat", "Unsupported format", (value) => {
            if (!value) return true;
            return ["image/jpeg", "image/png", "image/jpg"].includes(
              value.type,
            );
          }),
      }),
    ),
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // Create FormData to handle file uploads
    const formData = new FormData();
    values.products.forEach((product, index) => {
      formData.append(
        `product${index}`,
        JSON.stringify({
          name: product.name,
          description: product.description,
          price: product.price,
        }),
      );
      formData.append(`image${index}`, product.image);
    });

    // Example API call (replace with your actual API endpoint)
    console.log("Form Data:", formData);
    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            <FieldArray name="products">
              {({ push, remove }) => (
                <div>
                  {values.products.map((product, index) => (
                    <div key={index} className="p-4 border rounded-lg mb-4">
                      <div className="space-y-4">
                        {/* Product Name */}
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Product Name
                          </label>
                          <Field
                            name={`products.${index}.name`}
                            className="w-full p-2 border rounded"
                          />
                          {errors.products?.[index]?.name &&
                            touched.products?.[index]?.name && (
                              <div className="text-red-500 text-sm">
                                {errors.products[index].name}
                              </div>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Description
                          </label>
                          <Field
                            as="textarea"
                            name={`products.${index}.description`}
                            className="w-full p-2 border rounded"
                          />
                          {errors.products?.[index]?.description &&
                            touched.products?.[index]?.description && (
                              <div className="text-red-500 text-sm">
                                {errors.products[index].description}
                              </div>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Price
                          </label>
                          <Field
                            type="number"
                            name={`products.${index}.price`}
                            className="w-full p-2 border rounded"
                          />
                          {errors.products?.[index]?.price &&
                            touched.products?.[index]?.price && (
                              <div className="text-red-500 text-sm">
                                {errors.products[index].price}
                              </div>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Product Image
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.currentTarget.files[0];
                              setFieldValue(`products.${index}.image`, file);

                              // Create preview URL
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setFieldValue(
                                    `products.${index}.imagePreview`,
                                    reader.result,
                                  );
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="w-full p-2 border rounded"
                          />
                          {errors.products?.[index]?.image &&
                            touched.products?.[index]?.image && (
                              <div className="text-red-500 text-sm">
                                {errors.products[index].image}
                              </div>
                            )}

                          {/* Image Preview */}
                          {values.products[index].imagePreview && (
                            <img
                              src={values.products[index].imagePreview}
                              alt="Preview"
                              className="mt-2 h-32 object-cover rounded"
                            />
                          )}
                        </div>

                        {/* Remove Product Button */}
                        {values.products.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Remove Product
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Product Button */}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        name: "",
                        description: "",
                        price: "",
                        image: null,
                        imagePreview: "",
                      })
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Add Product
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
