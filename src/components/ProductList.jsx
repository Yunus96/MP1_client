import React, { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";



function ProductListing({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);


  const { addToCart, cartItems, wishlistItems, toggleWishlist } = useShop();
  const { categoryname } = useParams();

  //  API call on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://mp-1-server.vercel.app/api/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const json = await res.json();
        const productsData = json.data.products;

        setProducts(productsData);

        // derive price range
        const prices = productsData.map((p) => p.price);
        const max = Math.max(...prices);
        setMaxPrice(max);
        setPriceRange(max); // default = show all

        //  Fetch categories
        const categoryRes = await fetch(
          "https://mp-1-server.vercel.app/api/categories"
        );
        const categoryJson = await categoryRes.json();

        setCategories(categoryJson.data.categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
      if (categoryname && categories.length > 0) {
        const matchedCategory = categories.find(
          (cat) =>
            cat.name.toLowerCase() === categoryname.toLowerCase()
        );

        if (matchedCategory) {
          setSelectedCategories([matchedCategory._id]);
        }
      }
    }, [categoryname, categories]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h5>Loading products...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <h5>{error}</h5>
      </div>
    );
  }

  const handleCategoryChange = (categoryId) => {
        setSelectedCategories(
          (prev) =>
            prev.includes(categoryId)
              ? prev.filter((id) => id !== categoryId) // uncheck
              : [...prev, categoryId] // check
        );
  };

const filteredProducts = products
  .filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice = item.price <= priceRange;

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category?._id || item.category);

    const matchesRating =
      selectedRating === null || item.rating >= selectedRating;

    return (
      matchesSearch &&
      matchesPrice &&
      matchesCategory &&
      matchesRating
    );
  })
    .sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    }

    if (sortOrder === "highToLow") {
      return b.price - a.price;
    }

    return 0; // No sorting
  });



  return (
    <div className="container-fluid mt-4">
      
      <div className="row">
        {/* FILTERS */}
        <div className="col-md-3 filter-section px-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Filters</h5>
            <span
              className="clear-text"
              onClick={() => {
                setPriceRange(maxPrice);
                setSelectedCategories([]);
                setSelectedRating(null);
              }}
            >
              Clear
            </span>
          </div>
          {/* Price */}
          <h6>Price</h6>
          <input
            type="range"
            className="form-range"
            min="0"
            max={maxPrice}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
          />{" "}
          <div className="d-flex justify-content-between text-muted mb-4">
            <span>₹0</span>
            <span>₹{Math.floor(maxPrice / 2)}</span>
            <span>₹{maxPrice}</span>
          </div>
          {/* Category */}
          <h6>Category</h6>
          {categories.map((category) => (
            <div className="form-check" key={category._id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={category._id}
                checked={selectedCategories.includes(category._id)}
                onChange={() => handleCategoryChange(category._id)}
              />
              <label className="form-check-label" htmlFor={category._id}>
                {category.name}
              </label>
            </div>
          ))}
          {/* Rating */}
          <h6>Rating</h6>
          {[4, 3, 2, 1].map((r) => (
            <div className="form-check" key={r}>
              <input
                className="form-check-input"
                type="radio"
                name="rating"
                checked={selectedRating === r}
                onChange={() => setSelectedRating(r)}
              />
              <label className="form-check-label">{r} Stars & above</label>
            </div>
          ))}
          {/* Sort */}
          <h6 className="mt-4">Sort by</h6>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sort"
              checked={sortOrder === "lowToHigh"}
              onChange={() => setSortOrder("lowToHigh")}
            />
            <label className="form-check-label">Price - Low to High</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sort"
              checked={sortOrder === "highToLow"}
              onChange={() => setSortOrder("highToLow")}
            />
            <label className="form-check-label">Price - High to Low</label>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="col-md-9">
          <h5 className="mb-4">
            Showing All Products{" "}
            <span className="text-muted">
              ( Showing {filteredProducts.length} products )
            </span>
          </h5>

          <div className="row g-4">
            {filteredProducts.map((item, index) => {
              const isInCart = cartItems.some((c) => c.productId === item._id);
              const isWishlisted = wishlistItems.some((w) => {
                return w._id === item._id;
              });
              return (
                <div className="col-md-3" key={item._id}>
                  <ProductCard
                    item={item}
                    isInCart={isInCart}
                    isWishlisted={isWishlisted}
                    addToCart={addToCart}
                    toggleWishlist={toggleWishlist}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
