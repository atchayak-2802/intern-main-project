import SalesForm from "./SalesForm";

import SalesTable from "./SalesTable";
import { useNavigate } from "react-router-dom";
function Sales() {
  const navigate = useNavigate();

  return (
    <div className="container">

      <h1>SALES PAGE </h1>

      <SalesForm />

      <SalesTable />
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
          Back</button>

    </div>
  );
}

export default Sales;
