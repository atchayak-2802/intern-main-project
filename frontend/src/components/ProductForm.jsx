import { useState } from "react";

import axios from "axios";


function ProductForm({
  fetchProducts,
}) {

  const [form, setForm] =
    useState({

      productName: "",

      brand: "",

      quantity: "",

      buyingPrice: "",

      sellingPrice: "",

      expiryDate: "",

    });


  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };


  const handleSubmit = async () => {

    await axios.post(
      "http://localhost:5000/api/products",

      {
        ...form,

        quantity:
          Number(form.quantity),

        buyingPrice:
          Number(form.buyingPrice),

        sellingPrice:
          Number(form.sellingPrice),

      }
    );

    fetchProducts();

    alert("Product Added");

  };


  return (
    <div>

      <h2>Add Product</h2>

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
        name="quantity"
        placeholder="Quantity"
        onChange={handleChange}
      />

      <input
        type="number"
        name="buyingPrice"
        placeholder="Buying Price"
        onChange={handleChange}
      />

      <input
        type="number"
        name="sellingPrice"
        placeholder="Selling Price"
        onChange={handleChange}
      />

      <input
        type="date"
        name="expiryDate"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        Add Product
      </button>

    </div>
  );
}

export default ProductForm;
