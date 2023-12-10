import React from 'react';
import {Avatar, Box, Button, Grid, IconButton, Paper, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {useCart} from "../contexts/CartContext";
import {useNavigate} from "react-router-dom";


function Cart() {
  const navigate = useNavigate();
  const {cart, setCart} = useCart();
  const handleItemCountChange = (productId, newCount) => {
    let newCart;

    if (newCount <= 0) {
      // Remove the item from the cart if the count is zero or less
      newCart = cart.filter(item => item.product._id !== productId);
    } else {
      // Update the count of the item
      newCart = cart.map(item => {
        if (item.product._id === productId) {
          return {
            ...item,
            count: newCount
          };
        }
        return item;
      });
    }
    setCart(newCart);
  }

  const clearCart = () => {
    setCart([]);
  }
  if (!cart.length) {
    return <Typography variant="h6" align="center">Your Cart is Empty</Typography>;
  }

  const submitCartItems = async () => {
    return Promise.all(cart.map((item) => {
      const body = JSON.stringify(
        {
          product_id: item.product._id,
          buyer_id: sessionStorage.getItem("userId"),
          count: item.count
        }
      )
      console.log(body)
      return fetch(`${process.env.REACT_APP_BACKEND_API}/cart`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
      });
    }));
  };

  const submitOrder = async () => {
    if (sessionStorage.getItem("userId") === null) {
      navigate("/login");
      return;
    }
    try {
      await submitCartItems();
      const orderResponse = await fetch(`${process.env.REACT_APP_BACKEND_API}/cart/order`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          buyer_id: sessionStorage.getItem("userId"),
        })
      });

      if (orderResponse.ok) {
        console.log(orderResponse.json())
        alert('Order submitted');
        setCart([]);
        navigate("/account")
      }
    } catch (error) {
      console.error('Error during order submission:', error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.count * item.product.single_selling_price), 0);
  };

  return (
    <Box sx={{padding: 2}}>
      <Grid container spacing={2}>
        {cart.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.product._id}>
            <Paper sx={{padding: 2, display: 'flex', alignItems: 'center'}}>
              <Avatar alt={item.product.name} src={item.product.image}
                      sx={{width: 56, height: 56, marginRight: 2}}/>
              <Box sx={{flexGrow: 1}}>
                <Typography variant="subtitle1">{item.product.name}</Typography>
                <Typography variant="body2" color="text.secondary">Price:
                  ${item.product.single_selling_price}</Typography>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <IconButton size="small" onClick={() => handleItemCountChange(item.product._id, item.count - 1)}>
                    {item.count > 1 ? <RemoveIcon/> : <DeleteIcon/>}
                  </IconButton>
                  <Typography sx={{margin: '0 10px'}}>{item.count}</Typography>
                  <IconButton size="small" onClick={() => handleItemCountChange(item.product._id, item.count + 1)}>
                    <AddIcon/>
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{padding: 2, height: 'fit-content'}}>
          <Typography variant="h6" gutterBottom>Order Summary</Typography>
          <Typography variant="body1">Total: ${calculateTotal().toFixed(2)}</Typography>
          <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2}}>
            <Button onClick={clearCart} variant="outlined" color="error">
              Clear Cart
            </Button>
            <Button onClick={submitOrder} variant="contained" color="primary">
              Submit Order
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Box>
  );

}

export default Cart;
