import React from "react";
import ProfileDetails from "../components/ProfileDetails";
import AddressManager from "../components/AddressManager";
import OrderHistory from "../components/OrderHistory";

function ProfilePage() {
  return (
    <div className="container my-5">
      <h4 className="mb-4">My Profile</h4>

      <div className="row">
        <div className="col-md-6">
          <ProfileDetails />
        </div>

        <div className="col-md-6">
          <AddressManager />
        </div>
      </div>

      <hr className="my-5" />

      <OrderHistory />
    </div>
  );
}

export default ProfilePage;
