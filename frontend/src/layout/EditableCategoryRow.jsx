import React from "react";
import { useFormik } from "formik";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

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
        <ClearIcon
          style={{ fill: "#41af4b", cursor: "pointer" }}
          onClick={handleCancelClick}
        />
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
        <CheckIcon
          style={{ fill: "#41af4b", cursor: "pointer" }}
          onClick={formik.handleSubmit}
        />
      </td>
    </>
  );
};

export default EditableRow;
