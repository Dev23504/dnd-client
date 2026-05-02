import { Search, Heart, ShoppingBag, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart || []);
  const wishlist = useSelector((state) => state.wishlist || []);

  useEffect(() => {
    const updateUser = () => {
      const data = JSON.parse(localStorage.getItem("user") || "null");
      setUser(data);
    };

    window.addEventListener("userChanged", updateUser);

    return () => window.removeEventListener("userChanged", updateUser);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/?search=${search}`);
      setSearch("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("userChanged"));
    navigate("/login");
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-10 py-3">

        <Link to="/" className="text-xl md:text-2xl font-bold">
          D&D
        </Link>

        <div className="hidden md:flex gap-6 text-sm font-semibold">
          <Link to="/?category=men">Men</Link>
          <Link to="/?category=women">Women</Link>
          <Link to="/?category=kids">Kids</Link>
          <Link to="/?category=beauty">Beauty</Link>
        </div>

        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded w-[30%]">
          <Search size={18} className="cursor-pointer" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent outline-none ml-2 w-full text-sm"
          />
        </div>

        <div className="flex items-center gap-6 text-sm">

          {user ? (
            <>
              <Link to="/profile" className="flex flex-col items-center">
                <User size={18} />
                <span className="text-xs">
                  {user?.name?.split(" ")[0]}
                </span>
              </Link>

              <Link to="/wishlist" className="relative flex flex-col items-center">
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 right-0 bg-red-500 text-white text-xs px-1 rounded">
                    {wishlist.length}
                  </span>
                )}
                <span className="text-xs">Wishlist</span>
              </Link>

              <Link to="/cart" className="relative flex flex-col items-center">
                <ShoppingBag size={18} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 right-0 bg-green-500 text-white text-xs px-1 rounded">
                    {cart.length}
                  </span>
                )}
                <span className="text-xs">Bag</span>
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 text-xs hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-black text-white px-4 py-1 rounded"
            >
              Login
            </button>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;