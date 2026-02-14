import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/api";

const USER_EMAIL = "user123@gmail.com";

function AddressManager({ selectedAddress, setSelectedAddress }) {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);


  const fetchAddresses = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/address/${USER_EMAIL}`
      );
  
      if (!res.ok) throw new Error();
  
      const response = await res.json();
  
      const addressArray = response?.data?.addresses || [];
  
      setAddresses(addressArray);
  
      const defaultAddress = addressArray.find(
        (a) => a.isDefault
      );
  
      if (defaultAddress) {
        setSelectedAddress(defaultAddress._id);
      }
  
    } catch {
      toast.error("Failed to load addresses");
    }
  };
  
  
  useEffect(() => {
    fetchAddresses();
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    isDefault: false,
  });

  /* ---------------- HANDLE INPUT ---------------- */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ---------------- SUBMIT ADDRESS ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.pincode ||
      !formData.country
    ) {
      toast.error("Please fill all required fields");
      return;
    }
  
    try {
      setLoading(true);
  
      const url = editAddressId
        ? `${API_BASE_URL}/address/${editAddressId}`
        : `${API_BASE_URL}/address`;
  
      const method = editAddressId ? "PUT" : "POST";
  
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: USER_EMAIL,
          address: formData,
        }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to save address");
      }
  
      const response = await res.json();
  
      const updatedAddresses =
        response?.data?.addresses || [];
  
      setAddresses(updatedAddresses);
  
      // Auto-select default
      const defaultAddress = updatedAddresses.find(
        (a) => a.isDefault
      );
      if (defaultAddress) {
        setSelectedAddress(defaultAddress._id);
      }
  
      toast.success(
        editAddressId
          ? "Address updated successfully 🎉"
          : "Address added successfully 🎉"
      );
  
      // Reset
      setShowForm(false);
      setEditAddressId(null);
      setFormData({
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        isDefault: false,
      });
  
    } catch (error) {
      toast.error("Failed to save address");
    } finally {
      setLoading(false);
    }
  };
  

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (addressId) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/address/${addressId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: USER_EMAIL,
          }),
        }
      );
  
      if (!res.ok) {
        throw new Error("Failed to delete address");
      }
  
      const response = await res.json();
  
      const updatedAddresses =
        response?.data?.addresses || [];
  
      setAddresses(updatedAddresses);
  
      // If deleted address was selected → clear selection
      if (!updatedAddresses.find(a => a._id === selectedAddress)) {
        setSelectedAddress(null);
      }
  
      toast.success("Address deleted successfully");
  
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };
  
    /* ---------------- Edit ---------------- */

  const handleEdit = (address) => {
    setShowForm(true);
    setEditAddressId(address._id);
  
    setFormData({
      fullName: address.fullName,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
      isDefault: address.isDefault,
    });
  };
  

  /* ---------------- UI ---------------- */

  return (
    <div>
      <h5>Address Management</h5>
      <p className="text-muted">
        You can add multiple addresses, update and delete them.
        Choose one address for delivery.
      </p>

      {/* Address List */}
      {addresses.map((address) => (
        <div
          key={address._id}
          className={`border p-3 mb-2 ${
            selectedAddress === address._id
              ? "border-primary"
              : ""
          }`}
        >
          <div className="form-check">
            <input
              type="radio"
              name="address"
              checked={selectedAddress === address._id}
              onChange={() =>
                setSelectedAddress(address._id)
              }
              className="form-check-input"
            />
            <label className="form-check-label">
              {address.fullName}, {address.street},{" "}
              {address.city}, {address.state} -{" "}
              {address.pincode}, {address.country}
            </label>
          </div>

          <button
            className="btn btn-sm btn-outline-secondary me-2 mt-2"
            onClick={() => handleEdit(address)}
          >
            Edit
          </button>

          <button
            className="btn btn-sm btn-outline-danger mt-2"
            onClick={() => handleDelete(address._id)}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Add Button */}
      <button
        className="btn btn-outline-primary mt-3"
        onClick={() => setShowForm(true)}
      >
        + Add Address
      </button>

      {/* FORM */}
      {showForm && (
        <form
          className="border p-3 mt-3"
          onSubmit={handleSubmit}
        >
          <h6>Add New Address</h6>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="form-control mb-2"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="form-control mb-2"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="street"
            placeholder="Street"
            className="form-control mb-2"
            value={formData.street}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            className="form-control mb-2"
            value={formData.city}
            onChange={handleChange}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            className="form-control mb-2"
            value={formData.state}
            onChange={handleChange}
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            className="form-control mb-2"
            value={formData.pincode}
            onChange={handleChange}
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            className="form-control mb-2"
            value={formData.country}
            onChange={handleChange}
          />

          <div className="form-check mb-2">
            <input
              type="checkbox"
              name="isDefault"
              className="form-check-input"
              checked={formData.isDefault}
              onChange={handleChange}
            />
            <label className="form-check-label">
              Set as Default Address
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
        </form>
      )}
    </div>
  );
}

export default AddressManager;
