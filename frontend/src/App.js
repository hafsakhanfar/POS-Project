import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import POSPage from "./pages/POSPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/pos" element={<POSPage />} />
        <Route path="/catacgories" element={<CategoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
