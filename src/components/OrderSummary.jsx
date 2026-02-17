import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { useShop } from "../context/ShopContext";

const DELIVERY_CHARGE = 49;
const USER_ID = "6989a792d8e13444f432bacd"; // Replace later with dynamic user

function OrderSummary({ cartItems, selectedAddress }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCartItems } = useShop();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.productId.price,
    0
  );

  const discount = totalPrice * 0.5;
  const finalAmount = totalPrice - discount + DELIVERY_CHARGE;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select delivery address");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: USER_ID,
          addressId: selectedAddress,
          paymentMethod: "COD",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      const response = await res.json();

      toast.success("Order placed successfully 🎉");

      // Clear cart in frontend
      setCartItems([]);

      // Redirect to order history
      navigate(`/orders/${USER_ID}`);

    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
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

      <button
        className="btn btn-success w-100 mt-3"
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default OrderSummary;
