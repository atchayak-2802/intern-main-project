import { useEffect, useState } from "react";

import axios from "axios";


function SalesTable({ refresh }) {

  const [sales, setSales] =
    useState([]);


  const fetchSales = async () => {

    const res = await axios.get(
      "https://intern-main-project.onrender.com/api/sales"
    );

    setSales(res.data);

  };


  useEffect(() => {

    fetchSales();

  }, [refresh]);


  return (
    <div className="card">

      <h2>SALES HISTORY </h2>

      <table>

        <thead>

          <tr>

            <th>Product</th>

            <th>Brand</th>

            <th>Quantity Sold</th>

            <th>Total Amount</th>

            <th>Profit</th>

          </tr>

        </thead>


        <tbody>

          {sales.map((item) => (

            <tr key={item._id}>

              <td>{item.productName}</td>

              <td>{item.brand}</td>

              <td>{item.quantitySold}</td>

              <td>{item.totalAmount}</td>

              <td>{item.profit}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default SalesTable;
