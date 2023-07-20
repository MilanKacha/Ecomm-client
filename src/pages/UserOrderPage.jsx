import React from "react";
import UserOrders from "../features/user/components/UserOrders";
import Navbar from "../features/navbar/Navbar";

const UserOrderPage = () => {
  return (
    <div>
      <Navbar />
      <UserOrders />
    </div>
  );
};

export default UserOrderPage;
