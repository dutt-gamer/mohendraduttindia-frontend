import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import ProductCard from "./ProductCard";
import { addRecentlyViewed } from "../utils/productSlice";
import { API_URL } from "../utils/constants";

const ProductDetailsPage = () => {
  const recentlyViewed = useSelector((store) => store.products.recentlyViewed);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const getImageUrl = (url) => {
    if (!url) return "";
    return url.startsWith("https") ? url : `${API_URL}${url}`;
  };

  useEffect(() => {
    if (product) {
      dispatch(addRecentlyViewed(product));
    }
  }, [product, dispatch]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await fetch(`${API_URL}/api/products/${id}?populate=*`);
      const json = await data.json();
      const fetchedProduct = json.data;
      setProduct(fetchedProduct);

      if (fetchedProduct.images?.length > 0) {
        setSelectedImage(fetchedProduct.images[0].url);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center py-10">Loading...</p>;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        stock: product.quantity,
        quantity: 1,
      })
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <>
      {/* Product Section */}
      <div className="p-6 flex flex-col md:pt-28 md:flex-row gap-8">
        {/* Left Side (Images) */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <div className="w-full h-[400px] flex items-center justify-center rounded-lg bg-white">
            <img
              src={getImageUrl(selectedImage)}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-4 overflow-x-auto">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={getImageUrl(img.url)}
                alt={`thumb-${index}`}
                className={`w-20 h-20 object-contain rounded-md cursor-pointer ${
                  selectedImage === img.url
                    ? "border-blue-600 border-2"
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

          <div className="mt-4">
            <h2 className="font-bold text-xl mb-2">About this item</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {product.description
                ?.split("\n")
                .map((line, index) => <li key={index}>{line}</li>)}
            </ul>
          </div>

          <div className="mt-3 text-md text-gray-600">
            Rating: {product.rating}
            <span className="text-yellow-500 ml-1">&#9733;</span>
          </div>

          <div className="mt-2">
            <p className="font-medium text-gray-600">
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p className="text-gray-600 text-xs">
              Sold by Mohendra Dutt (India) & Co.
            </p>
          </div>

          {/* Features Row */}
          <div className="text-xs flex gap-6 mt-5 text-gray-700">
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">&#8635;</span>
              <p>10 days Returnable</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">&#128666;</span>
              <p>Free Delivery</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-yellow-500 text-lg">&#9733;</span>
              <p>Top Brands</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">&#128274;</span>
              <p>Secure Transaction</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
              disabled={product.quantity === 0}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition"
              disabled={product.quantity === 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Recently Viewed Section */}
      <div className="mt-12 px-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recently Viewed
        </h2>

        <div
          className="
            flex 
            gap-4 
            overflow-x-auto 
            overflow-y-hidden 
            snap-x 
            snap-mandatory 
            scroll-smooth 
            pb-4
          "
        >
          {recentlyViewed
            .filter((p) => p.id !== product.id)
            .map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-64 sm:w-72 snap-start"
              >
                <ProductCard product={item} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
