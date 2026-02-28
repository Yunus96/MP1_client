import { useShop } from "../context/ShopContext";
import { API_BASE_URL } from "../config/api";

function Wishlist() {
  const { wishlistItems, loadingWishlist, setWishlistItems, toggleWishlist, addToCart, cartItems, setCartItems } =
    useShop();

  let USER_EMAIL="user123@gmail.com"
  let USER_ID="6989a792d8e13444f432bacd"

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
      const previousWishlist = [...wishlistItems];

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
        setWishlistItems(previousWishlist);
      }
    };

  const moveToCart = async (product) => {
    const previousWishlist = [...wishlistItems];
    const previousCart = [...cartItems];

    setWishlistItems((prev) =>
      prev.filter((item) => item._id !== product._id)
    );

    setCartItems((prev) => [
      ...prev,
      {
        _id: product._id,
        productId: product._id,
        quantity: 1,
      },
    ]);

    try {
      const cartRes = await fetch(
        `${API_BASE_URL}/cart`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: USER_ID,
            productId: product._id,
          }),
        }
      );

      if (!cartRes.ok) {
        throw new Error("Failed to add to cart");
      }

      const wishlistRes = await fetch(
        `${API_BASE_URL}/wishlist`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: USER_EMAIL,
            productId: product._id,
          }),
        }
      );

      if (!wishlistRes.ok) {
        throw new Error("Failed to remove from wishlist");
      }
    } catch (error) {
      console.error("Move to cart failed. Rolling back...", error);
      setWishlistItems(previousWishlist);
      setCartItems(previousCart);
    }
  };

  return (
    <div className="container my-5">
      <h4 className="text-center mb-4">My Wishlist</h4>

      <div className="row justify-content-start">
        {wishlistItems.map((item) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item._id}>
            <div className="product-card">
              <div className="image-wrapper">


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

              <div className="d-flex gap-2 mt-2">
                <button
                  className="btn btn-outline-danger w-50"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove
                </button>

                <button
                  className="btn btn-secondary w-50"
                  onClick={() => moveToCart(item)}
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