import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { Link } from "react-router-dom";

function Wishlist() {
  const wishlist = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>No items in wishlist 😢</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlist.map((item) => (
            <div key={item._id} className="border p-3 rounded shadow">
              
              <Link to={`/product/${item._id}`}>
                <img src={item.image} className="h-40 w-full object-cover" />
                <h2 className="font-semibold mt-2">{item.name}</h2>
                <p className="text-pink-600">₹{item.price}</p>
              </Link>

              <button
                onClick={() => dispatch(removeFromWishlist(item._id))}
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded w-full"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;