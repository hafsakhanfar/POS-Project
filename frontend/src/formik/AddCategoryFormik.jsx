import React from "react";
import { Formik, Field, Form } from "formik";
import button from "../style/addButton.module.css";

function AddFormik({ categories, setCategories }) {
  return (
    <div>
      <h1>Add category</h1>
      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={(values, { resetForm }) => {
          const newData = {
            id: new Date().getTime().toString(),
            ...values,
          };
          fetch("categories", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(newData),
          });
          setCategories([...categories, newData]);
          resetForm({ values: "" });
        }}
      >
        <Form>
          <div >
            <label htmlFor="name" >
              name:
            </label>
            <Field
              type="text"
              name="name"
              id="name"
            
            />
          </div>

          <button type="submit" className={button.addButton}>
            Add
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddFormik;
