import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserCart } from "../redux/cartSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      return setError("Please fill all fields");
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return setError("Invalid email or password");
    }

    localStorage.setItem("user", JSON.stringify(foundUser));

    dispatch(loadUserCart());

    window.dispatchEvent(new Event("userChanged"));

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[360px]">

        <h2 className="text-3xl font-bold text-center mb-2">
          D&D Store 🛒
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to continue shopping
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-3 text-center">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border p-3 rounded-lg w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer"
          >
            👁️
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="bg-black hover:bg-gray-800 text-white w-full py-3 rounded-lg"
        >
          Login
        </button>

        <p className="text-center mt-3 text-sm">
          New to D&D?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-black font-bold cursor-pointer"
          >
            Create Account
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;