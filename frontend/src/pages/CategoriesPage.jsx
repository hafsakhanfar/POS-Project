import React from "react";
import { useEffect, useState, useContext } from "react";
import MainLayout from "../layout/MainLayout";
import DynamicTable from "../layout/DynamicTable";
import axios from "axios";
import Modal from "../Modal";
import EditableRow from "../layout/EditableCategoryRow";
import styles from "../style/productsandcategoresPages.module.css";
import AddFormik from "../formik/AddCategoryFormik";
import button from "../assetsStayles/addButton.module.css";
import searchBox from "../assetsStayles/searchBox.module.css";
import Loading from "../layout/Loading";
import { Context } from "../Context.js";

function CategoriesPage() {
  const [categories, setCategories] = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const fetchCategories = async () => {
    setIsLoading(true);
    const result = await axios.get("categories");
    setCategories(await result.data);
    setFilteredData(await result.data);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

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
      return null;
    });
    setFilteredData(data);
  }, [searchInput, categories]);

  const column = [
    { heading: "", value: "delete" },
    { heading: "Name", value: "name" },
    { heading: "", value: "edit" },
  ];

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
        <button onClick={toggleShowModal} className={button.addButton}>
          Add Category
        </button>
      </div>
      <div className={searchBox.searchDiv}>
        <input
          className={searchBox.searchInput}
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
          <div className={styles.modal}>
            <AddFormik categories={categories} setCategories={setCategories} />
            <button className="button" onClick={toggleShowModal}>
              CANCEL
            </button>
          </div>
        </Modal>
      ) : null}

      <div>
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <DynamicTable
            data={filteredData}
            column={column}
            dataName="categories"
            reRenderTableData={reRenderTableData}
            EditableRow={EditableRow}
            setData={setCategories}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default CategoriesPage;
