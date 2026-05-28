import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

function Inventory() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          Back</button>
    </div>
  );
}

export default Inventory;