import React, { useState } from "react";

function AddressManager({ selectedAddress, setSelectedAddress }) {
  const [addresses, setAddresses] = useState([]);

  const handleAddAddress = () => {
    const newAddress = {
      id: Date.now(),
      fullName: "Yunus Ahmed",
      street: "MG Road",
      city: "Bangalore",
      pincode: "560001",
    };

    setAddresses((prev) => [...prev, newAddress]);
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));

    if (selectedAddress === id) {
      setSelectedAddress(null);
    }
  };

  return (
    <div>
      <h5>Address Management</h5>
      <p className="text-muted">
        You can add multiple addresses, update and delete them. Choose one
        address for delivery.
      </p>

      {addresses.length === 0 && <p>No address added yet.</p>}

      {addresses.map((address) => (
        <div
          key={address.id}
          className={`border p-3 mb-2 ${
            selectedAddress === address.id ? "border-primary" : ""
          }`}
        >
          <div className="form-check">
            <input
              type="radio"
              name="address"
              checked={selectedAddress === address.id}
              onChange={() => setSelectedAddress(address.id)}
              className="form-check-input"
            />
            <label className="form-check-label">
              {address.fullName}, {address.street}, {address.city} -{" "}
              {address.pincode}
            </label>
          </div>

          <button
            className="btn btn-sm btn-outline-danger mt-2"
            onClick={() => handleDelete(address.id)}
          >
            Delete
          </button>
        </div>
      ))}

      <button
        className="btn btn-outline-primary mt-2"
        onClick={handleAddAddress}
      >
        + Add Address
      </button>
    </div>
  );
}

export default AddressManager;
