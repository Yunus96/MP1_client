import { useNavigate } from "react-router-dom";

function ProductCard({
  item,
  isInCart,
  isWishlisted,
  addToCart,
  toggleWishlist,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/products/${item._id}`)}
    >
      <div className="image-wrapper">
        <span
          className={`wishlist ${isWishlisted ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(item);
          }}
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
        className={`btn w-100 ${
          isInCart ? "btn-primary" : "btn-secondary"
        }`}
        onClick={(e) => {
          e.stopPropagation();
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