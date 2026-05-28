import { useEffect, useState } from "react";

import axios from "axios";


function Alerts({ refresh }) {

  const [lowStock, setLowStock] =
    useState([]);

  const [expiry, setExpiry] =
    useState([]);


  const fetchAlerts = async () => {

    const low = await axios.get(
      "http://localhost:5000/api/products/alerts/lowstock"
    );

    const exp = await axios.get(
      "http://localhost:5000/api/products/alerts/expiry"
    );

    setLowStock(low.data);

    setExpiry(exp.data);

  };


  useEffect(() => {

    fetchAlerts();

  }, [refresh]);


  return (
    <div>

      <h2>Alerts</h2>


      <h3>Low Stock</h3>

      {lowStock.length === 0 ? (
        <p>No Low Stock</p>
      ) : (

        lowStock.map((item) => (

          <p key={item._id}
          classname="alert-box low-stock">
            ⚠ {item.productName}
            {" "}Low Stock
          </p>

        ))

      )}


      <h3>Near Expiry</h3>

      {expiry.length === 0 ? (
        <p>No Expiry Alerts</p>
      ) : (

        expiry.map((item) => (

          <p key={item._id}
          classname="alert-box expiry">
            ⚠ {item.productName}
            {" "}Near Expiry
          </p>

        ))

      )}

    </div>
  );
}

export default Alerts;
