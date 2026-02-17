import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/api";

const USER_ID = "6989a792d8e13444f432bacd"; // or actual userId

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/orders/${USER_ID}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const response = await res.json();

        // Adjust depending on backend response shape
        const ordersArray =
          response?.data?.orders || [];

        setOrders(ordersArray);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load order history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ---------- UI STATES ---------- */

  if (loading) {
    return (
      <div className="text-center mt-4">
        <p>Loading order history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-danger mt-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h5>Order History</h5>
      <hr />

      {orders.length === 0 ? (
        <p>No previous orders.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border p-3 mb-3 rounded"
          >
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
