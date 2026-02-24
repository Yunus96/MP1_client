import { useShop } from "../context/ShopContext";
import { API_BASE_URL } from "../config/api";

function Wishlist() {
  const { wishlistItems, loadingWishlist, setWishlistItems, toggleWishlist, addToCart } =
    useShop();

  let USER_EMAIL="user123@gmail.com"

  if (loadingWishlist) {
    return (
      <div className="text-center mt-5">
        <h5>Loading wishlist...</h5>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h4>My Wishlist</h4>
        <p className="text-muted mt-3">Your wishlist is empty ❤️ </p>
      </div>
    );
  }

  const removeFromWishlist = async (productId) => {
      // Save previous state for rollback
      const previousWishlist = [...wishlistItems];

      // 🔥 Optimistic update
      setWishlistItems((prev) =>
        prev.filter((item) => item._id !== productId)
      );

      try {
        const res = await fetch(
          `${API_BASE_URL}/wishlist`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user: USER_EMAIL,
              productId,
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to remove from wishlist");
        }
      } catch (error) {
        console.error("Wishlist remove failed. Rolling back...", error);

        // 🔁 Rollback
        setWishlistItems(previousWishlist);
      }
    };

  return (
    <div className="container my-5">
      <h4 className="text-center mb-4">My Wishlist</h4>

      <div className="row justify-content-start">
        {wishlistItems.map((item) => (
          <div className="ol-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item._id}>
            <div className="wishlist-card">
              <div className="wishlist-image">
                <span
                  className="wishlist-heart"
                  onClick={() => toggleWishlist(item)}
                  style={{ cursor: "pointer" }}
                >
                  ❤
                </span>

                <img
                  src={
                    item.images?.[0] ||
                    "https://pngimg.com/uploads/jacket/jacket_PNG8058.png"
                  }
                  alt={item.name}
                />
              </div>

              <div className="wishlist-info text-center">
                <p className="mb-1">{item.name}</p>
                <strong>₹{item.price}</strong>
              </div>

              <div className="d-flex gap-2 mt-2">
                <button
                  className="btn btn-outline-danger w-50"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove
                </button>

                <button
                  className="btn btn-secondary w-50"
                  onClick={() => addToCart(item._id)}
                >
                  Move to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
