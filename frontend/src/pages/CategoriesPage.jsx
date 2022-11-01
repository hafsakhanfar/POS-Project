import React from "react";
import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import DynamicTable from "../layout/DynamicTable";
import axios from "axios";
import Modal from "../Modal";
import { useFormik } from "formik";
import EditableRow from "../layout/EditableCategoryRow";
import styles from "../style/productsAndCategoryPages.module.css";


function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values , {resetForm}) => {
      fetch("categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          id: new Date().getTime().toString(),
          ...values,
        }),
      });
      reRenderTableData();
      resetForm({values : ''})
    },
  });
  const fetchCategories = async () => {
    setIsLoading(true);
    const result = await axios.get("categories");
    setCategories(await result.data);
    setFilteredData(await result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories().catch((err) => console.log(err));
  }, []);
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setFilteredData(categories);
    const data = categories.filter((category) => {
      if (searchInput === "") return category;
      else if (category.name.toLowerCase().includes(searchInput)) {
        return category;
      }
      return null ;
    });
    setFilteredData(data);
  }, [searchInput , categories]);

  const column = [
    { heading: "", value: "delete" },
    { heading: "Name", value: "name" },
    { heading: "", value: "edit" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  const reRenderTableData = () => {
    fetchCategories();
  };

  return (
    <MainLayout>
       <div className={styles.header}>
        <h2>Categories</h2>
      </div>
      <div className={styles.subHeader}>
        <p>Add, view and edit your category in one place</p>
        <button onClick={toggleShowModal} className={styles.addButton}>
          Add Category
        </button>
      </div>
      <div className={styles.searchDiv}>
        <input
        className={styles.searchInput}
          name="search"
          placeholder="Search..."
          onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
          value={searchInput}
        />
        <div>
          showing <strong>{filteredData.length}</strong> categories
        </div>
      </div>

      {showModal ? (
        <Modal>
          <form onSubmit={handleSubmit}>
            <label>
              name:
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </label>

            <button type="submit">Submit</button>
            <button className="button" onClick={toggleShowModal}>
              CANCEL
            </button>
          </form>
        </Modal>
      ) : null}

      <div>
        {isLoading ? (
          "Loading"
        ) : (
          <DynamicTable
            data={filteredData}
            column={column}
            dataName="categories"
            reRenderTableData={reRenderTableData}
            EditableRow={EditableRow}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default CategoriesPage;
