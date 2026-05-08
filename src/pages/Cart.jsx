import { useDispatch, useSelector } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart
} from "../redux/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cart = useSelector(state => state.cart || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const handlePayment = async () => {
    try {
      if (!user) return navigate("/login");

      if (cart.length === 0) {
        alert("Cart Empty");
        return;
      }

      const res = await axios.post("https://d-d-backend-1.onrender.com/create-order", {
        amount: total
      });

      const orderData = {
        userId: user?._id || user?.email,
        name: user?.name,
        phone: user?.phone,
        address: user?.address,
        products: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          qty: item.qty || 1
        })),
        totalAmount: total,
        paymentId: "",
        orderId: res.data.id,
        status: "Processing",
        deliveryStatus: "Not Shipped",
        paymentStatus: "Pending"
      };

      const options = {
        key: "rzp_test_Sgep0zWrLqYeel",
        amount: res.data.amount,
        currency: "INR",
        name: "D&D Store",
        order_id: res.data.id,

        handler: async function (response) {
          try {
            orderData.paymentId = response.razorpay_payment_id;
            orderData.paymentStatus = "Paid";

            await axios.post("https://d-d-backend-1.onrender.com/order", orderData);

            localStorage.setItem("invoice", JSON.stringify(orderData));

            dispatch(clearCart());

            navigate("/success");
          } catch (err) {
            console.log(err);
            alert("Order saving failed");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      alert("Payment Error");
    }
  };

  return (
    <div className="p-6 min-h-screen">

      <h1 className="text-2xl font-bold">Your Cart 🛒</h1>

      {cart.length === 0 && <p>Cart is Empty</p>}

      {cart.map(item => (
        <div key={item._id} className="border p-4 mt-4 flex justify-between">

          <div>
            <h2>{item.name}</h2>
            <p>₹ {item.price}</p>
            <p>Qty: {item.qty || 1}</p>
          </div>

          <div className="flex gap-2 items-center">
            <button onClick={() => dispatch(decreaseQty(item))}>-</button>
            <button onClick={() => dispatch(increaseQty(item))}>+</button>
            <button onClick={() => dispatch(removeFromCart(item))}>
              Remove
            </button>
          </div>

        </div>
      ))}

      <h2 className="mt-5 font-bold text-xl">
        Total: ₹ {total}
      </h2>

      {cart.length > 0 && (
        <>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-green-600 text-white px-4 py-2 mt-4 mr-3"
          >
            Checkout
          </button>

          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-4 py-2 mt-4"
          >
            Pay Now
          </button>
        </>
      )}

    </div>
  );
}

export default Cart;