
function OrderHistory() {
  const orders = [
    {
      id: "ORD123",
      date: "10 Feb 2026",
      totalAmount: 1499,
      status: "Delivered",
    },
    {
      id: "ORD124",
      date: "15 Feb 2026",
      totalAmount: 899,
      status: "Shipped",
    },
  ];

  return (
    <div>
      <h5>Order History</h5>
      <hr />

      {orders.length === 0 ? (
        <p>No previous orders.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border p-3 mb-3 rounded"
          >
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
