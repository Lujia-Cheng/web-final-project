import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { IconButton, Button, Badge } from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useCart } from "../contexts/CartContext";

const ActionButtons = () => {
  const navigate = useNavigate();
  const { cart, setCart, getItemCount } = useCart();
  const itemCount = getItemCount();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setCart([]);
    navigate('/login');
  };

  return (
    <div>
      <IconButton component={RouterLink} to="/cart" color="inherit">
        <Badge badgeContent={itemCount} color="secondary">
          <ShoppingCartIcon/>
        </Badge>
      </IconButton>
      <IconButton component={RouterLink} to="/account">
        <AccountCircle/>
      </IconButton>
      {sessionStorage.getItem("userId") ? (
        <Button variant="contained" onClick={handleLogout} startIcon={<LogoutIcon/>} color="inherit">
          Log Out
        </Button>
      ) : (
        <Button variant="contained" component={RouterLink} startIcon={<LoginIcon/>} to="/login" color="inherit">
          Log In
        </Button>
      )}
    </div>
  );
}

export default ActionButtons;
