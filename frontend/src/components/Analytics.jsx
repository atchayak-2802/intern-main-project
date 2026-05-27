import {

  PieChart,

  Pie,

  Cell,

  Tooltip,

} from "recharts";

import {

  useEffect,

  useState,

} from "react";

import axios from "axios";


function Analytics({ refresh }) {

  const [data, setData] =
    useState([]);


  const fetchAnalytics =
    async () => {

      const res = await axios.get(
        "http://localhost:5000/api/sales/analytics"
      );


      const formatted =
        res.data.map((item) => ({

          name: item._id,

          value: item.totalSold,

        }));


      setData(formatted);

    };


  useEffect(() => {

    fetchAnalytics();

  }, [refresh]);


  return (
    <div>

      <h2>Brand Analytics</h2>

      <PieChart
        width={400}
        height={400}
      >

        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >

          {data.map((entry, index) => (

            <Cell key={index} />

          ))}

        </Pie>

        <Tooltip />

      </PieChart>

    </div>
  );
}

export default Analytics;




