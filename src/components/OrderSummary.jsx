import React from "react";
import { toast } from "react-toastify";

const DELIVERY_CHARGE = 49;

function OrderSummary({ cartItems, selectedAddress }) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.productId.price,
    0
  );

  const discount = totalPrice * 0.5;
  const finalAmount = totalPrice - discount + DELIVERY_CHARGE;

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast.error("Please select delivery address");
      return;
    }

    toast.success("Order placed successfully 🎉");
  };

  return (
    <div className="price-box">
      <h6>Order Summary</h6>
      <hr />

      <div className="price-line">
        <span>Items</span>
        <span>₹{totalPrice}</span>
      </div>

      <div className="price-line">
        <span>Discount</span>
        <span className="text-success">- ₹{discount}</span>
      </div>

      <div className="price-line">
        <span>Delivery</span>
        <span>₹{DELIVERY_CHARGE}</span>
      </div>

      <hr />

      <div className="price-line total">
        <strong>Total</strong>
        <strong>₹{finalAmount}</strong>
      </div>

      <button className="btn btn-success w-100 mt-3" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
}

export default OrderSummary;
