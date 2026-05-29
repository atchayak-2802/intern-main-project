import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Dashboard() {
   const navigate = useNavigate();
    const handleLogout = () => {
 

  localStorage.removeItem("token");


  navigate("/");
};



  return (
  <div className="put">
    <div className="dashboard-grid" >
        
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
        <Link to="/summary">
  <button>SUMMARY</button>
  </Link>


  
  <button onClick={handleLogout}>
      Logout
    </button>



      </div>
</div>
</div>
    
  );

}
export default Dashboard;
