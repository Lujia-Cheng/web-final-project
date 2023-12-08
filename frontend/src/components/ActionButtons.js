import React from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBox from "@mui/icons-material/AccountBox";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import {AccountCircle} from "@mui/icons-material";

const ActionButtons = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login')
  };

  return (
    <div>
      <IconButton component={RouterLink} to="/cart" color="inherit">
        <ShoppingCartIcon/>
      </IconButton>
      <IconButton component={RouterLink} to="/admin">
        <AccountCircle/>
      </IconButton>
      {sessionStorage.getItem( "userId") ? (
        <Button variant="contained" onClick={handleLogout} startIcon= {<LogoutIcon/>} color="inherit">
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
