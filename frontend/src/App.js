import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import POSPage from "./pages/POSPage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Context } from "./Context.js";
function App() {
  const [context, setContext] = useState([]);

  return (
    <Context.Provider value={[context, setContext]}>
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/" element={<POSPage />} />
          <Route path="/catacgories" element={<CategoriesPage />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
