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
    axios.get(`https://d-d-backend-1.onrender.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 flex gap-10">
      <img src={product.image} className="h-80 rounded" />

      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-xl text-pink-600 mt-2">₹{product.price}</p>

        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-5 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;