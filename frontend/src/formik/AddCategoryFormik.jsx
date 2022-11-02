import React from "react";
import { Formik, Field, Form } from "formik";
import button from "../assetsStayles/addButton.module.css";
import style from "../assetsStayles/formik.module.css";
import input from "../assetsStayles/input.module.css";

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
        <Form className={style.form}>
          <label htmlFor="name">name: </label>
          <Field type="text" name="name" id="name" className={input.input} required/>
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
