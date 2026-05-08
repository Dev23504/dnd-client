import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password || !phone || !address) {
      alert("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = users.find((u) => u.email === email);

    if (alreadyExists) {
      alert("User already exists");
      return;
    }

    const newUser = {
      _id: Date.now().toString(),
      name,
      email,
      password,
      phone,
      address
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser));

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[360px]">

        <h2 className="text-3xl font-bold text-center mb-2">
          D&D Store 🛒
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Create your account
        </p>

        <input
          placeholder="Full Name"
          className="border p-3 rounded-lg w-full mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="border p-3 rounded-lg w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          placeholder="Mobile Number"
          className="border p-3 rounded-lg w-full mb-3"
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Address"
          className="border p-3 rounded-lg w-full mb-3"
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-black hover:bg-gray-800 text-white w-full py-3 rounded-lg"
        >
          Create Account
        </button>

        <p className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-black font-bold cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;