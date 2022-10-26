import { useEffect, useRef, useState } from "react";
import MainLayout from "../layout/MainLayout";
import DynamicTable from "../layout/DynamicTable";
import axios from "axios";
import Modal from "../Modal";
import { useFormik } from "formik";
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      catagory: "",
      image: "",
      price: "",
    },
    onSubmit: (values) => {
      fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          id: new Date().getTime().toString(),
          ...values,
        }),
      });
    },
  });
  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get("products");
    setProducts(await result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts().catch((err) => console.log(err));
  }, []);
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  const column = [
    { heading: "", value: "delete" },
    { heading: "Name", value: "name" },
    { heading: "Product Code", value: "code" },
    { heading: "Catagory", value: "catagory" },
    { heading: "Image", value: "image" },
    { heading: "Price", value: "price" },
    { heading: "", value: "edit" },
  ];

  const handleSubmit = (event)=>{
    event.preventDefault();
    formik.handleSubmit();

    fetchProducts();
  }
  return (
    <div>
      
        <div style={{ margin: 50 }}>
          <button onClick={toggleShowModal}>add product</button>{" "}
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
                    value={formik.values.firstName}
                  />
                </label>

                <label>
                  Code:
                  <input
                    type="text"
                    name="code"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                </label>

                <label>
                  catagory:
                  <input
                    type="text"
                    name="catagory"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                </label>
                <label>
                  image:
                  <input
                    type="text"
                    name="image"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                </label>
                <label>
                  price:
                  <input
                    type="number"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
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
            <DynamicTable data={products} column={column} />
          )}
        </div>

        
     
    </div>
  );
}

export default ProductsPage;
