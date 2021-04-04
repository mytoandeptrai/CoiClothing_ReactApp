import React from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import ProductInputField from "./ProductInputField";
const ProductForm = () => {
  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("A text is required"),
    category: Yup.string().required("A text is required"),
    description: Yup.string().required("A text is required"),
    // price: Yup.number().integer().default(0).required("Price is required"),
    // discount: Yup.number()
    //   .integer()
    //   .default(0)
    //   .required("Discount is required"),
    file: Yup.mixed()
      .required("A file is required")
      // .test(
      //   "fileSize",
      //   "File too large",
      //   (value) => value && value.size <= FILE_SIZE
      // )
      .test(
        "file",
        // "Unsupported Format",
        function(value) {
          console.log('value',value)
          return value && SUPPORTED_FORMATS.includes(value.type)
        }
      ),
  });
  return (
    <div>
      <Formik
        initialValues={{
          id: uuidv4(),
          file: undefined,
          title: "",
          category: "",
          description: "",
          price: "",
          discount: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => {
          return (
            <>
              <Form>
                <h1>Add new product!</h1>
                <div className="title">
                  <ProductInputField type="text" label="title" name="title" />
                </div>
                <div className="image">
                  <ProductInputField
                    name="file"
                    type="file"
                    label="imageURL"
                  />
                </div>
                <div className="category">
                  <ProductInputField
                    type="text"
                    label="category"
                    name="category"
                  />
                </div>
                <div className="description">
                  <ProductInputField
                    type="text"
                    label="description"
                    name="description"
                  />
                </div>
                {/* <div className="discount">
                  <ProductInputField
                    type="number"
                    label="discount"
                    name="discount"
                  />
                </div>
                <div className="price">
                  <ProductInputField type="number" label="price" name="price" />
                </div> */}
                <div className="btn">
                  <button type="submit">
                    {formikProps.isSubmitting ? "Loading..." : "Submit"}
                  </button>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProductForm;
