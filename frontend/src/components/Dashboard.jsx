import { Link } from "react-router-dom";

function Dashboard() {

  return (

    <div className="dashboard-grid">

      <h1>SMART INVENTORY AND EXPIRY MANAGEMENT</h1>

      <div className="dashboard-cards">

        <Link to="/inventory">
          <button >INVENTORY</button>
        </Link>

        <Link to="/sales">
          <button >SALES</button>
        </Link>

        <Link to="/alerts">
          <button >ALERT</button>
        </Link>

        <Link to="/analytics">
          <button >ANALYTICS </button>
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;
