import React from 'react';
import Button from "@mui/material/Button";

function LogoutButtom() {
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }


  return (
    <div>
      <Button onClick={logout}>
        Logout
      </Button>
    </div>
  );
}