import { useNavigate } from "react-router-dom";

function ProductCard({
  item,
  isInCart,
  isWishlisted,
  addToCart,
  toggleWishlist,
}) {
  return (
    <div className="product-card">
      <div className="image-wrapper">
        <span
          className={`wishlist ${isWishlisted ? "active" : ""}`}
          onClick={() => toggleWishlist(item)}
        >
          ♥
        </span>

        <img
          src={
            item.images?.[0] ||
            "https://via.placeholder.com/300x200"
          }
          alt={item.name}
        />
      </div>

      <div className="text-center mt-3">
        <p className="product-name mb-1">{item.name}</p>
        <small className="text-muted">⭐ {item.rating}</small>
        <h6 className="fw-bold">₹{item.price}</h6>
      </div>

      <button
        className={`btn w-100 ${
          isInCart ? "btn-primary" : "btn-secondary"
        }`}
        onClick={() => {
          if (!isInCart) {
            addToCart(item._id);
          }
        }}
      >
        {isInCart ? "Go to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;