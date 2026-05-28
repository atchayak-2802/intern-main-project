import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";

import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import SalesForm from "./components/SalesForm";
import SalesTable from "./components/SalesTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 LOGIN PAGE */}
        <Route path="/" element={<Login />} />

        {/* MAIN PAGES */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />

        {/* PRODUCT */}
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/products" element={<ProductTable />} />

        {/* SALES */}
        <Route path="/sales-form" element={<SalesForm />} />
        <Route path="/sales-table" element={<SalesTable />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
