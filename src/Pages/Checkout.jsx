import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || ""
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("All fields required");
      return;
    }

    localStorage.setItem("checkoutUser", JSON.stringify(form));

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((u) =>
      u.email === user?.email
        ? { ...u, phone: form.phone, address: form.address, name: form.name }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, ...form })
    );

    navigate("/cart");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold">Checkout</h1>

      <input
        name="name"
        value={form.name}
        placeholder="Name"
        onChange={handleChange}
        className="border p-2 w-full mt-3"
      />

      <input
        name="phone"
        value={form.phone}
        placeholder="Phone"
        onChange={handleChange}
        className="border p-2 w-full mt-3"
      />

      <textarea
        name="address"
        value={form.address}
        placeholder="Address"
        onChange={handleChange}
        className="border p-2 w-full mt-3"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 mt-4"
      >
        Save & Go to Cart
      </button>

    </div>
  );
}

export default Checkout;