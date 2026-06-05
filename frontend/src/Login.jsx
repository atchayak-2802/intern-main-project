
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "https://intern-main-project.onrender.com/api/auth/login",
      { email, password }
    );

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } else {
      alert(res.data.message);
    }

  } catch (err) {
    alert("Login failed");
  }
};
  return (
    <div className="card" style={{maxWidth: "400px",margin: "100px auto"}}>
      
      <h2>LOGIN FORM</h2>

      <form onSubmit={handleLogin}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
        <br/><br/>
        <h4>
  Don't have an account ?   
  <Link to="/register">REGISTER</Link></h4>
<br/><br/>
      </form>
    </div>
  );
}

export default Login;