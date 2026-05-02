import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import Slider from "../components/Slider";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  const category = searchParams.get("category");
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params = {};
        if (category) params.category = category;
        if (search) params.search = search;

        const res = await axios.get("https://d-d-backend-1.onrender.com", { params });

        const updated = res.data.map((p) => ({
          ...p,
          discount: p.discount || Math.floor(Math.random() * 40) + 10,
          originalPrice: p.originalPrice || Math.floor(p.price * 1.5)
        }));

        setProducts(updated);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search]);

  const toggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const isInWishlist = wishlist.find((item) => item._id === product._id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="p-6">

      <Slider />

      <div className="flex gap-3 mb-6 flex-wrap">
        <Link to="/" className={`px-3 py-1 rounded ${!category ? "bg-black text-white" : "bg-gray-200"}`}>All</Link>
        <Link to="/?category=men" className={`px-3 py-1 rounded ${category === "men" ? "bg-black text-white" : "bg-pink-200"}`}>Men</Link>
        <Link to="/?category=women" className={`px-3 py-1 rounded ${category === "women" ? "bg-black text-white" : "bg-pink-200"}`}>Women</Link>
        <Link to="/?category=kids" className={`px-3 py-1 rounded ${category === "kids" ? "bg-black text-white" : "bg-pink-200"}`}>Kids</Link>
        <Link to="/?category=beauty" className={`px-3 py-1 rounded ${category === "beauty" ? "bg-black text-white" : "bg-pink-200"}`}>Beauty</Link>
      </div>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.length > 0 ? (
            products.map((p) => {
              const isInWishlist = wishlist.find((item) => item._id === p._id);

              return (
                <Link to={`/product/${p._id}`} key={p._id}>
                  <div className="border rounded-lg overflow-hidden shadow hover:scale-105 transition relative">

                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      {p.discount}% OFF
                    </span>

                    <button
                      onClick={(e) => toggleWishlist(e, p)}
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                    >
                      <Heart size={18} color={isInWishlist ? "red" : "black"} />
                    </button>

                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-48 w-full object-cover"
                    />

                    <div className="p-3">
                      <h2 className="font-semibold">{p.name}</h2>

                      <div className="flex items-center gap-2">
                        <p className="text-pink-600 font-bold text-lg">₹{p.price}</p>
                        <p className="line-through text-gray-400 text-sm">
                          ₹{p.originalPrice}
                        </p>
                      </div>
                    </div>

                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-center col-span-4">No products found 😢</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;