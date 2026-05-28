import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import SalesForm from "./SalesForm";
import Alerts from "./Alerts";
import Analytics from "./Analytics";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  // 🔐 LOGIN PROTECTION
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/products"
    );

    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  // 🚪 Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">

      <h1>Smart Inventory Dashboard</h1>

      {/* 🚪 Logout Button */}
      <button onClick={handleLogout}>
        Logout
      </button>

      <ProductForm fetchProducts={fetchProducts} />

      <SalesForm
        fetchProducts={fetchProducts}
        setRefresh={setRefresh}
      />

      <Alerts refresh={refresh} />

      <Analytics refresh={refresh} />

      <ProductTable
        products={products}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}

export default Dashboard;
