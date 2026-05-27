import { useEffect, useState } from "react";

import axios from "axios";

import ProductForm from "./ProductForm";

import ProductTable from "./ProductTable";

import SalesForm from "./SalesForm";


import SalesTable from "./SalesTable";

import Alerts from "./Alerts";

import Analytics from "./Analytics";


function Dashboard() {

  const [products, setProducts] =
    useState([]);

  const [refresh, setRefresh] =
    useState(false);


  const fetchProducts = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/products"
    );

    setProducts(res.data);

  };


  useEffect(() => {

    fetchProducts();

  }, [refresh]);


  return (

    <div className="container">

      <h1>
        Smart Inventory Dashboard
      </h1>


      <ProductForm
        fetchProducts={fetchProducts}
      />


      <SalesForm
        fetchProducts={fetchProducts}
        setRefresh={setRefresh}
      />


      <Alerts refresh={refresh} />

      <Analytics refresh={refresh} />


      <ProductTable
        products={products}
        fetchProducts={fetchProducts}
      />




      <SalesTable
        refresh={refresh}
      />

    </div>
  );
}

export default Dashboard;

