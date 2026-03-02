import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

import { API_BASE_URL } from "../config/api";

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
    (item) =>  item._id === productId
  );
  // Fetch selected product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/products/${productId}`
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

  //  Fetch selected product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/products/${productId}`
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

  const discountPercent = 50;
  const oldPrice = Math.floor(product?.price * 2);

  return (
    <div className="container my-4 product-detail-wrapper">
      <div className="row">
        {/* LEFT SECTION */}
        <div className="col-md-4">
          <div className="product-image-container">
            <span
              className={`wishlist ${
                isWishlisted ? "active" : ""
              }`}
              onClick={() => toggleWishlist(product)}
            > ♥ </span>
            <img
              src={product?.images?.[0]}
              alt={product?.name}
              className="img-fluid"
            />
          </div>

          <button className="btn buy-btn w-100 mt-3">Buy Now</button>
          <button
            className="btn cart-btn w-100 mt-2"
            disabled={isInCart}
            onClick={() => {
              addToCart(product?._id);
              toast.success("Added to cart");
            }}
          >
            {isInCart ? "Already in Cart" : "Add to Cart"}
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-md-8">
          <h5 className="product-title">
            {product?.name}
          </h5>

          {/* Rating */}
          <div className="rating-section">
            <span className="rating-number">{product?.rating}</span>
            <span className="stars">⭐⭐⭐⭐☆</span>
          </div>

          {/* Price */}
          <div className="price-section">
            <span className="current-price">₹{product?.price}</span>
            <span className="old-price">₹{oldPrice}</span>
          </div>
          <div className="discount">{discountPercent}% off</div>

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
                    selectedSize === size ? "active-size" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <hr />

          {/* Delivery Icons */}
          <div className="delivery-row">
            <div className="delivery-item">
              <span>📦</span>
              <p>10 days<br />Returns</p>
            </div>
            <div className="delivery-item">
              <span>💵</span>
              <p>Pay on<br />Delivery</p>
            </div>
            <div className="delivery-item">
              <span>🚚</span>
              <p>Free<br />Delivery</p>
            </div>
            <div className="delivery-item">
              <span>🔒</span>
              <p>Secure<br />Payment</p>
            </div>
          </div>

          <hr />

          {/* Description */}
          <div className="description">
            <h6>Description:</h6>
            <ul>
              <li>
                {product?.description}
              </li>
              <li>
                ALL-WEATHER READY: Stay comfortable in any weather.
              </li>
              <li>
                UNPARALLELED COMFORT: Enjoy a snug, non-restrictive fit.
              </li>
              <li>
                VERSATILE ESSENTIAL: Perfect for casual outings.
              </li>
              <li>
                TRAVEL-FRIENDLY: Lightweight and easy to pack.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <div className="mt-5">
        <h6>More items you may like in apparel</h6>
        <div className="row g-4 mt-2">
          {[1, 2, 3, 4].map((_, index) => (
            <div className="col-md-3" key={index}>
              <div className="similar-card">
                <span className="wishlist-icon small">♡</span>
                <img
                  src="https://pngimg.com/uploads/jacket/jacket_PNG8058.png"
                  alt="product"
                />
                <p className="mt-2">Men Premium Jacket</p>
                <strong>₹2000</strong>
                <button className="btn cart-btn w-100 mt-2">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;