import React from "react";
import { useShop } from "../context/ShopContext";

function Cart() {
  const { cartItems, loadingCart } = useShop();

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

  // Temporary product lookup (until product map / populate API exists)
  const DELIVERY_CHARGE = 49;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * 2000,
    0
  );

  const discount = totalPrice * 0.5;
  const finalAmount = totalPrice - discount + DELIVERY_CHARGE;

  return (
    <div className="container my-5">
      <h5 className="text-center mb-4">MY CART ({cartItems.length})</h5>
      <div className="row justify-content-center">
        {/* LEFT: CART ITEMS */}
        {console.log(cartItems)}
        <div className="col-md-7">
          {" "}
          {cartItems.map((item) => (
            <div className="cart-item d-flex mb-4" key={item._id}>
              <div className="cart-image">
                <img src={item.productId.images[0]} alt={item.productId.name} />
              </div>

              <div className="cart-details ms-4">
                <h6>Product ID: {item._id}</h6>
                <div className="price-row">
                  <span className="price">₹{item.productId.price}</span>
                  <span className="old-price ms-2">₹3999</span>
                </div>
                <div className="discount">50% off</div>
                <div className="quantity mt-2">
                  Quantity :<button className="qty-btn ms-2">-</button>
                  <span className="qty-number mx-2">{item.quantity}</span>
                  <button className="qty-btn">+</button>
                </div>
                <button className="btn btn-secondary w-100 mt-3">
                  Remove From Cart
                </button>
                <button className="btn btn-outline-secondary w-100 mt-2">
                  Move to Wishlist
                </button>
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
              <span>Delivery Charges</span>
              <span>₹{DELIVERY_CHARGE}</span>
            </div>

            <hr />

            <div className="price-line total">
              <span>TOTAL AMOUNT</span>
              <span>₹{finalAmount}</span>
            </div>

            <p className="save-text mt-2">
              You will save ₹{discount} on this order
            </p>

            <button className="btn btn-primary w-100 mt-3">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
