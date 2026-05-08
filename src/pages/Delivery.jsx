function Delivery() {
  const order = JSON.parse(localStorage.getItem("invoice"));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Delivery Tracking 🚚</h1>

      <p className="mt-3">Order ID: {order?.orderId}</p>
      <p>Status: {order?.status}</p>

      <div className="mt-4">
        <p>📦 Processing</p>
        <p>📦 Packed</p>
        <p>🚚 Shipped</p>
        <p>🚚 Out for Delivery</p>
        <p>🏠 Delivered</p>
      </div>
    </div>
  );
}

export default Delivery;