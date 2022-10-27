import React from "react";
import { useFormik } from "formik";

const EditableRow = ({ editFormData, handleEditForm, handleCancelClick }) => {
  const formik = useFormik({
    initialValues: {
      name: editFormData.name,
      code: editFormData.code,
      category: editFormData.category,
      image: editFormData.image,
      price: editFormData.price,
    },
    onSubmit: (values) => {
      handleEditForm(values, editFormData.id);
    },
  });

  return (
    <>
      <td>
        <button type="button" onClick={handleCancelClick}>
          X
        </button>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        ></input>
      </td>
      <td>
        <button type="button" onClick={formik.handleSubmit}>
          O
        </button>
      </td>
    </>
  );
};

export default EditableRow;
