import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";


function Analytics() {

  const [data, setData] = useState([]);


  useEffect(() => {

    fetchAnalytics();

  }, []);


  const fetchAnalytics = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/sales/analytics"
    );


    const formatted = res.data.map(
      (item) => ({

      name: `${item._id.productName} - ${item._id.brand}`,

        value: item.totalSold

      })
    );

    setData(formatted);
  };


  // COLORS

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


  return (

    <div className="analytics-box">

      <div className="chart-card">

        <h2>
         BRAND ANALYTICS
        </h2>

        <PieChart
          width={500}
          height={450}
        >

          <Pie

            data={data}

            dataKey="value"

            cx="50%"

            cy="50%"

            outerRadius={150}

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

          <Legend />

        </PieChart>

      </div>

    </div>
  );
}

export default Analytics;
