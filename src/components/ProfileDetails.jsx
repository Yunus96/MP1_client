<<<<<<< HEAD
import React from "react";
=======
>>>>>>> d02ac3718a13d42090c668c68da962a12ae1c23b

function ProfileDetails() {
  const user = {
    name: "Yunus Ahmed",
    email: "user123@gmail.com",
    phone: "9876543210",
  };

  return (
    <div className="border p-4 rounded">
      <h5>User Details</h5>
      <hr />

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
    </div>
  );
}

export default ProfileDetails;
