import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useShop } from "../context/ShopContext";
import { API_BASE_URL } from "../config/api";

function Cart() {
  const { cartItems, setCartItems, loadingCart, wishlistItems, setWishlistItems } = useShop();

  const USER_ID = "6989a792d8e13444f432bacd";
  const USER_EMAIL = "user123@gmail.com";
  const navigate = useNavigate();

  if (loadingCart) {
    return (
      <div className="text-center mt-5">
        <h5>Loading cart...</h5>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h5>MY CART</h5>
        <p className="text-muted mt-3">Your cart is empty 🛒</p>
      </div>
    );
  }

  /* ---------------- QUANTITY UPDATE ---------------- */
  const handleQuantityChange = async (productId, action) => {
    //  Save previous state (for rollback)
    const previousCart = [...cartItems];

    // Optimistic update
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId._id === productId
          ? {
              ...item,
              quantity:
                action === "increment"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
    toast.success("Quantity updated");

    //  API Call
    try {
      const res = await fetch(`${API_BASE_URL}/cart/quantity`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: USER_ID,
          productId,
          action,
        }),
      });

      if (!res.ok) {
        throw new Error("Quantity update failed");
        toast.error("Quantity update failed");
      }

      
    } catch (error) {
      console.error("Quantity update failed. Rolling back...", error);

      // Rollback UI
      setCartItems(previousCart);
    }
  };

  /* ---------------- Remove from Cart ---------------- */
  const handleRemoveFromCart = async (productId) => {
    const previousCart = [...cartItems];

    // Optimistic UI update
    setCartItems((prev) =>
      prev.filter((item) => item.productId._id !== productId)
    );

    try {
      const res = await fetch(`${API_BASE_URL}/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: USER_ID,
          productId,
        }),
      });

      if (!res.ok) {
        throw new Error("Remove from cart failed");
      }
    } catch (error) {
      console.error("Remove from cart failed. Rolling back...", error);
      setCartItems(previousCart);
    }
  };

  /* ---------------- move to wishlist ---------------- */
const handleMoveToWishlist = async (productId) => {
    const previousCart = [...cartItems];
    const previousWishlist = [...wishlistItems];

    // Find the full product object from cart
    const cartItem = cartItems.find((item) => item.productId._id === productId);
    const product = cartItem?.productId;

    // Optimistic update — remove from cart and add to wishlist immediately
    setCartItems((prev) =>
      prev.filter((item) => item.productId._id !== productId)
    );

    if (product) {
      setWishlistItems((prev) => [
        ...prev,
        { ...product, _id: product._id, productId: product._id },
      ]);
    }

    try {
      const wishlistRes = await fetch(`${API_BASE_URL}/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: USER_EMAIL,
          productId,
        }),
      });

      if (!wishlistRes.ok) {
        throw new Error("Failed to add to wishlist");
      }

      const cartRes = await fetch(`${API_BASE_URL}/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: USER_ID,
          productId,
        }),
      });

      if (!cartRes.ok) {
        throw new Error("Failed to remove from cart");
      }

      toast.success("Item moved to wishlist");
    } catch (error) {
      console.error("Move to wishlist failed. Rolling back...", error);
      setCartItems(previousCart);
      setWishlistItems(previousWishlist);
      toast.error("Failed to move item. Please try again.");
    }
  };

  /* ---------------- PRICE CALCULATION ---------------- */

  const DELIVERY_CHARGE = 49;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.productId.price,
    0
  );

  const discount = totalPrice * 0.5;
  const finalAmount = totalPrice - discount + DELIVERY_CHARGE;

  return (
    <div className="container my-5">
      <h5 className="text-center mb-4">MY CART ({cartItems.length})</h5>

      <div className="row justify-content-center">
      {/* LEFT: CART ITEMS */}
        <div className="col-12 col-md-7">
          {cartItems.map((item) => (
            <div className="cart-item mb-4 p-3" key={item._id}>

              {/* Image on top, details below, buttons full width at bottom */}
              <div className="d-flex flex-column">
                <div className="cart-image-mobile">
                  <img src={item.productId.images?.[0]} alt={item.productId.name} />
                </div>

                <div className="cart-details mt-3">
                  <h6>{item.productId.name}</h6>

                  <div className="price-row">
                    <span className="price">₹{item.productId.price}</span>
                  </div>

                  <div className="quantity mt-2 d-flex align-items-center gap-2">
                    <span>Quantity:</span>
                    <div className="qty-controls">
                      <button
                        className="qty-btn-mobile"
                        onClick={() => handleQuantityChange(item.productId._id, "decrement")}
                      >
                        -
                      </button>
                      <span className="qty-number-mobile">{item.quantity}</span>
                      <button
                        className="qty-btn-mobile"
                        onClick={() => handleQuantityChange(item.productId._id, "increment")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Buttons always below image, full width */}
                <div className="cart-action-btns mt-3">
                  <button
                    className="btn btn-secondary w-100"
                    onClick={() => handleRemoveFromCart(item.productId._id)}
                  >
                    Remove From Cart
                  </button>
                  <button
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={() => handleMoveToWishlist(item.productId._id)}
                  >
                    Move to Wishlist
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* RIGHT: PRICE DETAILS */}
        <div className="col-md-4">
          <div className="price-box">
            <h6>PRICE DETAILS</h6>
            <hr />

            <div className="price-line">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="price-line">
              <span>Discount</span>
              <span className="text-success">- ₹{discount}</span>
            </div>

            <div className="price-line">
              <span>Delivery Charges </span>
              <span>₹{DELIVERY_CHARGE}</span>
            </div>

            <hr />

            <div className="price-line total">
              <span>TOTAL AMOUNT</span>
              <span>₹{finalAmount}</span>
            </div>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;