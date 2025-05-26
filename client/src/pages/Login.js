import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./login.css"; // Ensure this exists and is linked

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    contact_number: "",
    address: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isAdmin = (username) => {
    return username.toLowerCase().endsWith("@brewgram.com");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = "http://localhost:5000";
      const url = isLogin ? `${baseUrl}/login` : `${baseUrl}/signup`;
      const data = isLogin
        ? { username: formData.username, password: formData.password }
        : formData;

      const res = await axios.post(url, data);

      if (!isLogin) {
        alert(res.data.message);
        setIsLogin(true);
        return;
      }

      const { id, token, name, role, contact_number, address } = res.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify({ id, name, username: formData.username, role }));
      localStorage.setItem("userInfo", JSON.stringify({ name, contact_number, address }));

      if (role === "admin" || isAdmin(formData.username)) {
        navigate("/admindashboard");
      } else {
        navigate("/customerdashboard");
      }
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-container">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                name="contact_number"
                type="text"
                placeholder="Contact Number"
                value={formData.contact_number}
                onChange={handleChange}
                required
              />
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </>
          )}
          {isLogin && (
            <>
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </>
          )}
          <button type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="switch-mode" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </>
  );
};

export default Login;
