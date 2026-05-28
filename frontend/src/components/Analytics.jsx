import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Analytics() {

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // 🎨 COLORS
  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f97316",
    "#dc2626",
    "#9333ea",
    "#06b6d4",
    "#e11d48",
    "#84cc16",
  ];

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/sales/analytics"
      );

      // ✅ DIRECTLY SET DATA
      setData(res.data);

    } catch (err) {

      console.error(err);
    }
  };

  return (

    <div className="analytics-container" >
      <div className="chart-card">
      <h1>
        BRAND ANALYTICS
      </h1>

      {data.length > 0 ? (

        <PieChart width={700} height={450}>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={160}
            innerRadius={70}
            paddingAngle={5}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend >
  layout="vertical"
  verticalAlign="middle"
  align="right"</Legend>


        </PieChart>

      ) : (

        <p>
          No Analytics Data
        </p>

      )}
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
          Back</button>

    </div>
    </div>
  );
}

export default Analytics;