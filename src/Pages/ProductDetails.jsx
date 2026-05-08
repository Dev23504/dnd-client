import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://d-d-backend-1.onrender.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 flex flex-col md:flex-row gap-10">

      <div className="bg-gray-100 p-4 rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="h-80 w-80 object-cover rounded-xl"
        />
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-bold">
          {product.name}
        </h1>

        <p className="text-gray-500 mt-2 capitalize">
          {product.category}
        </p>

        <p className="text-3xl text-pink-600 font-bold mt-4">
          ₹{product.price}
        </p>

        <p className="mt-4 text-gray-600">
          Premium quality product with stylish design and comfortable fit.
        </p>

        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-6 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}

export default ProductDetails;