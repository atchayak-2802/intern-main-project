import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Summary() {

  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/sales/summary/today"
    );

    setData(res.data);
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="summary-container">

      <h1>TODAY SUMMARY</h1>

      <div className="summary-grid">

        <div className="card profit">
          <h2>Profit</h2>
          <p>₹ {data.totalProfit}</p>
        </div>

        <div className="card loss">
          <h2>Expiry Loss</h2>
          <p>₹ {data.expiryLoss}</p>
        </div>

        <div className="card sales">
          <h2>Total Sales</h2>
          <p>{data.totalSales}</p>
        </div>

        <div className="card top">
          <h2>Top Product</h2>
          <p>
            {data.highestProfitProduct?.productName}
            <br />
            ({data.highestProfitProduct?.brand})
          </p>
        </div>

        <div className="card net">
          <h2>Net Profit</h2>
          <p>₹ {data.netProfit}</p>
        </div>

      </div>
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
          Back</button>

    </div>
  );
}

export default Summary;