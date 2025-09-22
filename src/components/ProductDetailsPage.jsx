import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import ProductCard from "./ProductCard";
import { addRecentlyViewed } from "../utils/productSlice";

const ProductDetailsPage = () => {
  const recentlyViewed = useSelector((store) => store.products.recentlyViewed);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (product) {
      dispatch(addRecentlyViewed(product));
    }
  }, [product, dispatch]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await fetch(
        `http://localhost:1337/api/products/${id}?populate=*`
      );
      const json = await data.json();
      const fetchedProduct = json.data;
      setProduct(fetchedProduct);

      if (fetchedProduct.images?.length > 0) {
        setSelectedImage(fetchedProduct.images[0].url);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        stock: product.quantity,
        quantity: 1, // always add 1 per click
      })
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <>
      <div className="p-8 flex flex-col md:flex-row gap-8">
        {/* Left Side (Images) */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <div className="w-[28rem] h-[28rem] flex items-center justify-center rounded-lg bg-gray-200">
            <img
              src={`http://localhost:1337${selectedImage}`}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:1337${img.url}`}
                alt={`thumb-${index}`}
                className={`w-20 h-20 object-contain rounded-md cursor-pointer ${
                  selectedImage === img.url
                    ? "border-2 border-blue-600"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img.url)}
              />
            ))}
          </div>
        </div>

        {/* Right Side (Details) */}
        <div className="flex flex-col w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          <p className="text-2xl text-red-600 font-semibold mt-3">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <ul className="mt-4 list-disc list-inside text-gray-700 text-sm space-y-1">
            <h2 className="font-bold text-xl">About this item</h2>
            {product.description.split("\n").map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
          <div className="mt-2">
            <p className="text-md text-gray-600">
              Rating: {product.rating}
              <span className="text-yellow-500">&#9733;</span>
            </p>
          </div>

          <div className="mt-2">
            <p className="font-medium text-gray-600">
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </p>

            <p className="text-gray-600 text-xs">
              Sold by Mohendra Dutt (India) & Co.
            </p>
          </div>

          <div className="text-xs flex gap-4 mt-4 text-gray-700">
            <div className="flex flex-col items-center gap-2">
              <p className="scale-200 text-black">&#8635;</p>
              <p className="flex flex-col items-center">
                <p>10 days</p>
                <p>Returnable</p>
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="scale-150">&#128666;</p>
              <p className="flex flex-col items-center">
                <p>Free</p>
                <p>Delivery</p>
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="scale-200 text-yellow-500">&#9733;</p>
              <p className="flex flex-col items-center">
                <p>Top</p>
                <p>Brands</p>
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="scale-125">&#128274;</p>
              <p className="flex flex-col items-center">
                <p>Secure</p>
                <p>Transaction</p>
              </p>
            </div>
          </div>

          {/* Add to Cart & Buy Now */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors cursor-pointer"
              disabled={product.quantity === 0}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors cursor-pointer"
              disabled={product.quantity === 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12 px-8">
        <h2 className="text-xl font-semibold mb-4">Recently Viewed</h2>
        <div className="flex flex-col h-56 sm:h-full sm:flex-row overflow-scroll">
          {recentlyViewed
            .filter((p) => p.id !== product.id) // don’t show current product
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
