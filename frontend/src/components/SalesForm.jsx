import { useState } from "react";

import axios from "axios";


function SalesForm({

  fetchProducts,

  setRefresh,

}) {

  const [sale, setSale] =
    useState({

      productName: "",

      brand: "",

      quantitySold: "",

    });


  const handleChange = (e) => {

    setSale({

      ...sale,

      [e.target.name]:
        e.target.value,

    });

  };


  const handleSell = async () => {

  try {

    await axios.post(
      "https://intern-main-project.onrender.com/api/sales/sell",

      {
        ...sale,

        quantitySold:
          Number(sale.quantitySold),

      }
    );

    fetchProducts();

    setRefresh(prev => !prev);

    alert("Product Sold");

  } catch (error) {

    alert(
      error.response.data.message
    );

  }
};


  return (
    <div className="card">

      <h2>SELL PRODUCT </h2>

      <input
        name="productName"
        placeholder="Product Name"
        onChange={handleChange}
      />

      <input
        name="brand"
        placeholder="Brand"
        onChange={handleChange}
      />

      <input
        type="number"
        name="quantitySold"
        placeholder="Quantity Sold"
        onChange={handleChange}
      />

      <button onClick={handleSell}>
        Sell Product
      </button>

    </div>
  );
}

export default SalesForm;

