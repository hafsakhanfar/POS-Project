import { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import ProductsContainer from "../layout/POSComponent/ProductsContainer";
import CategoriesContainer from "../layout/POSComponent/CategoriesContainer";
import Cart from "../layout/POSComponent/Cart";

function POSPage() {
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    if (localStorage.getItem("localCart")) {
      const storedList = JSON.parse(localStorage.getItem("localCart"));
      setCart(storedList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("localCart", JSON.stringify(cart));
  }, [cart]);


  const addProductToCart = (product) => {
    let findProductInCart = cart.find((i) => {
      return i.id === product.id;
    });

    if (findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalPrice: cartItem.price * (cartItem.quantity + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalPrice: product.price,
      };
      setCart([...cart, addingProduct]);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get("products");
    setProducts(await result.data);
    setFilteredData(await result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts().catch((err) => console.log(err));
    fetchCategories().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let data;
    if (filterValue === "") {
      data = products.filter((product) => {
        if (searchInput === "") return product;
        else if (product.name.includes(searchInput)) {
          return product;
        }
      });
      setFilteredData(data);
    } else if (filterValue !== "" && searchInput === "") {
      data = products.filter((product) => {
        if (product.category.match(filterValue)) {
          return product;
        }
      });
      setFilteredData(data);
    } else {
      data = filteredData.filter((product) => {
        if (searchInput === "") return product;
        else if (product.name.includes(searchInput)) {
          return product;
        }
      });

      setFilteredData(data);
    }
  }, [searchInput, filterValue]);

  const fetchCategories = async () => {
    const result = await axios.get("categories");
    setCategories(await result.data);
  };

  return (
    <MainLayout>
      <div style={{ margin: 50 }}>
        <input
          className="search"
          placeholder="Search..."
          onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
          value={searchInput}
        />
      </div>

      <div style={{ margin: 100 }}>
        <div>
          {isLoading ? (
            "loading"
          ) : (
            <ProductsContainer
              products={filteredData}
              handleProductClick={addProductToCart}
            />
          )}
        </div>
        <div>
          <button onClick={() => setFilterValue("")}>All</button>
          <CategoriesContainer
            categories={categories}
            setFilterValue={setFilterValue}
          />
        </div>
      </div>
      <div style={{ margin: 100 }}>
        {cart.length !== 0 ? (
          <Cart cartItems={cart} setCart={setCart} />
        ) : (
          "there is no product on cart"
        )}
      </div>
    </MainLayout>
  );
}

export default POSPage;
