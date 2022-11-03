import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import POSPage from "./pages/POSPage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Context } from "./Context.js";
import axios from "axios";

function App() {
  const [context, setContext] = useState([]);

  const fetchCategories = async () => {
    const result = await axios.get("categories");
    setContext(await result.data);
  };

  useEffect(() => {
    fetchCategories().catch((err) => console.log(err));
  }, []);
  return (
    <Context.Provider value={[context, setContext]}>
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/POS" element={<POSPage />} />
          <Route path="/" element={<CategoriesPage />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
