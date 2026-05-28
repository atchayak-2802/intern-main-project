import { useEffect, useState } from "react";

import axios from "axios";

function Alerts() {

  const [expiry, setExpiry] = useState([]);

  const [lowStock, setLowStock] = useState([]);


  useEffect(() => {

    fetchAlerts();

  }, []);


  const fetchAlerts = async () => {

    const exp = await axios.get(
      "http://localhost:5000/api/products/alerts/expiry"
    );

    const low = await axios.get(
      "http://localhost:5000/api/products/alerts/lowstock"
    );

    setExpiry(exp.data);

    setLowStock(low.data);
  };


  // DAYS LEFT

  const getDaysLeft = (date) => {

    const today = new Date();

    const expiryDate = new Date(date);

    const diffTime =
      expiryDate - today;

    return Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );
  };


  // EXPIRY COLOR

  const getExpiryClass = (days) => {

    if (days < 0) {

      return "expired";

    } else if (days <= 2) {

      return "critical";

    } else if (days <= 7) {

      return "warning";

    } else {

      return "safe";
    }
  };


  // STOCK COLOR

  const getStockClass = (qty) => {

    if (qty <= 5) {

      return "critical";

    } else {

      return "warning";
    }
  };


  return (

    <div className="alerts-wrapper">

      <h1 className="alert-title">

        INVENTORY ALERTS

      </h1>


      {/* LOW STOCK */}

      {lowStock.map((item) => (

        <div
          key={item._id}
          className={`alert-card ${getStockClass(item.quantity)}`}
        >

          <div className="alert-icon">

            {item.quantity <= 5
              ? "🚨"
              : "⚠️"}

          </div>

          <div>

            <h3>

              Low Stock Alert

            </h3>

            <p>

             {item.brand} {item.productName} 
              {" "}has only{" "}
              <strong>
                {item.quantity}
              </strong>
              {" "}items left.

            </p>

          </div>

        </div>

      ))}


      {/* EXPIRY */}

      {expiry.map((item) => {

        const daysLeft =
          getDaysLeft(item.expiryDate);

        return (

          <div
            key={item._id}
            className={`alert-card ${getExpiryClass(daysLeft)}`}
          >

            <div className="alert-icon">

              {daysLeft < 0
                ? "❌"
                : daysLeft <= 2
                ? "🚨"
                : daysLeft <= 7
                ? "⚠️"
                : "✅"}

            </div>

            <div>

              <h3>

                {item.brand} {item.productName}

              </h3>

              <p>

                {daysLeft < 0
                  ? "Product Expired"
                  : `Expires in ${daysLeft} day(s)`}

              </p>

            </div>

          </div>

        );
      })}

    </div>
  );
}

export default Alerts;