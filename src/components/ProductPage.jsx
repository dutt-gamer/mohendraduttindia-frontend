import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { setProducts } from "../utils/productSlice";

const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items); // global products
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetch("http://localhost:1337/api/products?populate=*");
        const json = await data.json();
        dispatch(setProducts(json.data)); // store globally
        setFilteredProducts(json.data); // local filtered state
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [dispatch]);

  const handleSearch = () => {
    if (!searchText.trim()) return setFilteredProducts(products);
    const filtered = products.filter(
      (p) =>
        p.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    if (order === "") return setFilteredProducts(products);

    let sortedProducts = [...filteredProducts];
    if (order === "lowToHigh") sortedProducts.sort((a, b) => a.price - b.price);
    else if (order === "highToLow") sortedProducts.sort((a, b) => b.price - a.price);

    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="relative bg-gray-900 min-h-screen">
      {/* Search + Sort */}
      <span className="sticky flex w-full md:w-[45%] mx-auto rounded-sm justify-center top-0 z-30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex items-center"
        >
          <input
            type="text"
            className="w-50 text-sm md:text-md md:w-80 m-2 p-2 bg-white rounded-md" 
            value={searchText}
            placeholder="Search Products..."
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" className="bg-gray-300/80 hover:bg-gray-300 transition-colors text-sm md:text-md text-gray-800 m-2 p-2 rounded-md cursor-pointer">
            Search
          </button>
          <div className="flex justify-center my-2 text-sm md:text-md">
            <select
              value={sortOrder}
              onChange={(e) => handleSort(e.target.value)}
              className="p-2 rounded-md text-gray-800 bg-gray-300/80 hover:bg-gray-300 transition-colors cursor-pointer"
            >
              <option className="cursor-pointer" value="">Filter price</option>
              <option className="cursor-pointer" value="lowToHigh">Low to High</option>
              <option className="cursor-pointer" value="highToLow">High to Low</option>
            </select>
          </div>
        </form>
      </span>

      {/* Products */}
      <div className="flex flex-wrap justify-center items-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-200">No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
