import { Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import Register from "./Register";

import Dashboard from "./components/Dashboard";

import Inventory from "./components/Inventory";
import Sales from "./components/Sales";

import Alerts from "./components/Alerts";
import Analytics from "./components/Analytics";
import Summary from "./components/Summary";

function App() {

  return (

    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/inventory" element={<Inventory />} />

      <Route path="/sales" element={<Sales />} />

      <Route path="/alerts" element={<Alerts />} />

      <Route path="/analytics" element={<Analytics />} />
      <Route path="/summary" element={<Summary />} />

    </Routes>

  );
}

export default App;
