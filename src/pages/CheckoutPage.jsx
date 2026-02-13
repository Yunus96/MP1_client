import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import AddressManager from "../components/AddressManager";
import OrderSummary from "../components/OrderSummary";

function CheckoutPage() {
  const { cartItems } = useShop();
  const [selectedAddress, setSelectedAddress] = useState(null);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h5>Your cart is empty 🛒</h5>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h4 className="mb-4">Checkout</h4>

      <div className="row">
        <div className="col-md-7">
          <AddressManager
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        </div>

        <div className="col-md-5">
          <OrderSummary
            cartItems={cartItems}
            selectedAddress={selectedAddress}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
