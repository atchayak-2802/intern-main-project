import { useEffect, useState } from "react";

import axios from "axios";

import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

function Inventory() {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/products"
    );

    setProducts(res.data);
  };

  useEffect(() => {

    fetchProducts();

  }, []);

  return (

    <div className="container">

      <h1>INVENTORY PAGE</h1>

      <ProductForm
        fetchProducts={fetchProducts}
      />

      <ProductTable
        products={products}
        fetchProducts={fetchProducts}
      />

    </div>
  );
}

export default Inventory;