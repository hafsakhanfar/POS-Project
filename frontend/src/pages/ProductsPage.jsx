import { useEffect, useRef, useState } from "react";
import MainLayout from "../layout/MainLayout";
import DynamicTable from "../layout/DynamicTable";
import axios from "axios";
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get("products");
    setProducts(await result.data);
    setIsLoading(false);
  };

  // useEffect(() => {
  //  fetchProducts();
  // }, []);
  useEffect(() => {
   fetchProducts()
      .catch(err => console.log(err))
  }, []);


  const column = [
    { heading: 'Name', value: 'name' },
    { heading: 'Product Code', value: 'code' },
    { heading: 'Catagory', value: 'catagory' },
    { heading: 'Image', value: 'image' },
    { heading: 'Price', value: 'price' },
  ]
  return (
    
    <div>
      <MainLayout>

        <div>{isLoading ? 'Loading' :
              <DynamicTable data={products} column={column} />
            }
       </div>
          
        </MainLayout>
    </div>
  );
}

export default ProductsPage;
