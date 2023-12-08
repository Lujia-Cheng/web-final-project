import React from "react";
import AdminAccount from "../components/AdminAccount";
import UserAccount from "../components/UserAccount";
import Login from "./Login";

function Account() {
  const isAdmin = () => {
    return sessionStorage.getItem("isAdmin") === "true";
  }
  return (
    <div>
      {
        !sessionStorage.getItem("userId") ? <Login/> : (isAdmin() ? <AdminAccount/> : <UserAccount/>)}
    </div>
  );
}

export default Account;