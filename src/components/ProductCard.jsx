import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({
  item,
  isInCart,
  isWishlisted,
  addToCart,
  toggleWishlist,
}) {
  const navigate = useNavigate();
  const [optimisticWishlisted, setOptimisticWishlisted] = useState(isWishlisted);
   const [optimisticInCart, setOptimisticInCart] = useState(isInCart);

  const handleWishlistClick = async (e) => {
    e.stopPropagation();

    // Optimistic update
    setOptimisticWishlisted((prev) => !prev);

    try {
      await toggleWishlist(item);
    } catch (err) {
      // Rollback on failure
      setOptimisticWishlisted((prev) => !prev);
    }
  };

  const handleCartClick = async (e) => {
    e.stopPropagation();

    if (optimisticInCart) {
      navigate("/cart");
      return;
    }

    // Optimistic update
    setOptimisticInCart(true);

    try {
      await addToCart(item._id);
    } catch (err) {
      // Rollback on failure
      setOptimisticInCart(false);
    }
  };

  return (
    <div
      className="product-card"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/products/${item._id}`)}
    >
      <div className="image-wrapper">
        <span
          className={`wishlist ${optimisticWishlisted ? "active" : ""}`}
          onClick={handleWishlistClick}
        >
          ♥
        </span>

        <img
          src={item.images?.[0] || "https://via.placeholder.com/300x200"}
          alt={item.name}
        />
      </div>

      <div className="text-center mt-3">
        <p className="product-name mb-1">{item.name}</p>
        <small className="text-muted">⭐ {item.rating}</small>
        <h6 className="fw-bold">₹{item.price}</h6>
      </div>

     <button
        className={`btn w-100 ${optimisticInCart ? "btn-primary" : "btn-secondary"}`}
        onClick={handleCartClick}
      >
        {optimisticInCart ? "Go to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;