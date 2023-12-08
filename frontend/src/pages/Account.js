import React from "react";
import AdminAccount from "../components/AdminAccount";
import UserAccount from "../components/UserAccount";

function Account() {
  const isAdmin = () => {
    fetch(`${process.env.REACT_APP_BACKEND_API}/is-admin/${sessionStorage.getItem('userId')}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then((data) => {
      console.log('Success:', data);
      if (data.isAdmin) {
        return true;
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
    return false
  }
  return (

    <div>
      {isAdmin() ? <AdminAccount/> : <UserAccount/>}
    </div>
  );
}

export default Account;