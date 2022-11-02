import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import DynamicTable from "../layout/DynamicTable";
import axios from "axios";
import Modal from "../Modal";
import { useFormik } from "formik";
import EditableRow from "../layout/EditableProductRow";
import styles from "../style/productsandcategoresPages.module.css";
import button from "../style/addButton.module.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      category: "",
      image: "",
      price: "",
    },
    onSubmit: (values, { resetForm }) => {
      fetch("products", {
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
      resetForm({ values: "" });
    },
  });
  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get("products");
    setProducts(await result.data);
    setFilteredData(await result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const data = products.filter((product) => {
      if (searchInput === "") return product;
      else if (product.name.toLowerCase().includes(searchInput)) {
        return product;
      }
      return null;
    });
    setFilteredData(data);
  }, [searchInput, products]);

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  const column = [
    { heading: "", value: "delete" },
    { heading: "Image", value: "image" },
    { heading: "Name", value: "name" },
    { heading: "Product Code", value: "code" },
    { heading: "Category", value: "category" },
    { heading: "Price", value: "price" },
    { heading: "", value: "edit" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    formik.handleSubmit();
    reRenderTableData();
  };

  const reRenderTableData = () => {
    fetchProducts();
  };

  const fetchCategories = async () => {
    const result = await axios.get("categories");
    setCategories(await result.data);
  };
  const handleAddClick = async () => {
    fetchCategories().then(toggleShowModal());
  };

  return (
    <MainLayout>
      <div className={styles.header}>
        <h2>Products</h2>
      </div>
      <div className={styles.subHeader}>
        <p>Add, view and edit your product in one place</p>
        <button onClick={handleAddClick} className={button.addButton}>
          Add Product
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
          showing <strong>{filteredData.length}</strong> products
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

            <label>
              Code:
              <input
                type="text"
                name="code"
                onChange={formik.handleChange}
                value={formik.values.code}
              />
            </label>
            <label>
              category:
              {categories.length !== 0 ? (
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
              ) : (
                "loading"
              )}
            </label>
            <label>
              image:
              <input
                type="text"
                name="image"
                onChange={formik.handleChange}
                value={formik.values.image}
              />
            </label>
            <label>
              price:
              <input
                type="text"
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
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
            dataName="products"
            reRenderTableData={reRenderTableData}
            EditableRow={EditableRow}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default ProductsPage;
