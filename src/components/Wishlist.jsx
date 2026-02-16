import React from "react";
import { useShop } from "../context/ShopContext";

function Wishlist() {
  const { wishlistItems, loadingWishlist, toggleWishlist, addToCart } =
    useShop();

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
                  onClick={() => toggleWishlist(item)}
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
