import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

const EditableRow = ({ editFormData, handleEditForm, handleCancelClick }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const result = await axios.get("categories");
    setCategories(await result.data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

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
          placeholder="Enter an image..."
          name="image"
          onChange={formik.handleChange}
          value={formik.values.image}
        ></input>
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
        <input
          type="text"
          required="required"
          placeholder="Enter an code..."
          name="code"
          onChange={formik.handleChange}
          value={formik.values.code}
        ></input>
      </td>
      <td>
        <select
          onChange={formik.handleChange}
          value={formik.values.category}
          name="category"
        >
          <option></option>
          {categories.map((category) => (
            <option>{category.name}</option>
          ))}
        </select>
      </td>

      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an price..."
          name="price"
          onChange={formik.handleChange}
          value={formik.values.price}
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
