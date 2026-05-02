import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);

    axios
      .get(`https://d-d-backend-1.onrender.com/${storedUser._id}`)
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="bg-white shadow p-5 rounded mb-6">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone || "Not added"}</p>
        <p><b>Address:</b> {user.address || "Not added"}</p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate("/wishlist")}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          My Wishlist
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          My Cart
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-3">My Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length > 0 ? (
        orders.map((o) => (
          <div key={o._id} className="border p-4 mb-3 rounded">
            <p>Total: ₹{o.totalAmount}</p>
            <p>Status: {o.status}</p>
          </div>
        ))
      ) : (
        <p>No orders yet</p>
      )}

    </div>
  );
}

export default Profile;