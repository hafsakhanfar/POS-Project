import React from "react";
import { Formik, Field, Form } from "formik";
import button from "../assetsStayles/addButton.module.css";
import style from "../assetsStayles/formik.module.css";
import input from "../assetsStayles/input.module.css";

function AddFormik({ products, setProducts, categories }) {
  return (
    <div>
      <h1>Add Product</h1>
      <Formik
        initialValues={{
          name: "",
          code: "",
          category: "",
          image: "",
          price: "",
        }}
        onSubmit={(values, { resetForm }) => {
          const newData = {
            id: new Date().getTime().toString(),
            ...values,
          };
          fetch("products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(newData),
          });
          setProducts([...products, newData]);
          resetForm({ values: "" });
        }}
      >
        <Form className={style.form}>
          <label htmlFor="name">Name: </label>
          <Field
            type="text"
            name="name"
            id="name"
            className={input.input}
            required
          />
          <label htmlFor="code">Code: </label>
          <Field
            type="text"
            name="code"
            id="code"
            className={input.input}
            required
          />
          <label htmlFor="category">category: </label>
          <Field
            as="select"
            type="text"
            name="category"
            id="category"
            className={input.input}
            required
          >
            <option></option>
            {categories.map((category) => (
              <option>{category.name}</option>
            ))}
          </Field>

          <label htmlFor="image">Image: </label>
          <Field
            type="text"
            name="image"
            id="image"
            className={input.input}
            required
          />
          <label htmlFor="price">Price: </label>
          <Field
            type="text"
            name="price"
            id="price"
            className={input.input}
            required
          />
          <button
            type="submit"
            className={button.addButton}
            style={{ width: 350 }}
          >
            Add
          </button>
        </Form>
      </Formik>
    </div>
  );
}
export default AddFormik;
