import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductDetail() {
  const { productId } = useParams();
  const { addToCart, toggleWishlist, cartItems, wishlistItems } = useShop();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const isInCart = cartItems.some(
    (item) => item.productId === productId
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.productId === productId
  );

  // 🔥 Fetch selected product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://mp-1-server.vercel.app/api/products/${productId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const json = await res.json();
        setProduct(json.data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <h5>Loading product...</h5>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-5 text-danger">
        <h5>{error}</h5>
      </div>
    );

  if (!product) return null;

  const discountPercent = 50;
  const oldPrice = Math.floor(product.price * 2);

  return (
    <div className="container my-4">
      <div className="row">
        {/* LEFT */}
        <div className="col-md-4">
          <div className="product-image-container">
            <span
              className={`wishlist-icon ${
                isWishlisted ? "active" : ""
              }`}
              onClick={() => toggleWishlist(product)}
            >
              ♥
            </span>

            <img
              src={product.images?.[0]}
              alt={product.name}
              className="img-fluid"
            />
          </div>

          <button className="btn buy-btn w-100 mt-3">
            Buy Now
          </button>

          <button
            className="btn cart-btn w-100 mt-2"
            disabled={isInCart}
            onClick={() => {
              addToCart(product._id);
              toast.success("Added to cart");
            }}
          >
            {isInCart ? "Already in Cart" : "Add to Cart"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="col-md-8">
          <h5>{product.name}</h5>

          <div className="rating-section">
            <span>{product.rating}</span>
            <span>⭐⭐⭐⭐☆</span>
          </div>

          <div className="price-section">
            <span className="current-price">
              ₹{product.price}
            </span>
            <span className="old-price">
              ₹{oldPrice}
            </span>
          </div>

          <div className="discount">
            {discountPercent}% off
          </div>

          {/* Quantity */}
          <div className="mt-3">
            <strong>Quantity:</strong>
            <button
              className="qty-btn"
              onClick={() =>
                setQuantity((prev) =>
                  prev > 1 ? prev - 1 : 1
                )
              }
            >
              -
            </button>
            <span className="qty-number">{quantity}</span>
            <button
              className="qty-btn"
              onClick={() =>
                setQuantity((prev) => prev + 1)
              }
            >
              +
            </button>
          </div>

          {/* Size */}
          <div className="mt-3">
            <strong>Size:</strong>
            <div className="size-container">
              {["S", "M", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className={`size-btn ${
                    selectedSize === size
                      ? "active-size"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedSize(size)
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <hr />

          {/* Description */}
          <div className="description">
            <h6>Description:</h6>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;