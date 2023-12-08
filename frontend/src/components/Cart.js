import React from 'react';
import {Avatar, Box, Button, Grid, IconButton, Paper, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useCart} from "../contexts/CartContext";

function Cart() {
  const {cart, setCart} = useCart();
  const handleItemCountChange = (productId, newCount) => {
    let newCart;

    if (newCount <= 0) {
      // Remove the item from the cart if the count is zero or less
      newCart = cart.filter(item => item.product_id._id !== productId);
    } else {
      // Update the count of the item
      newCart = cart.map(item => {
        if (item.product_id._id === productId) {
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

  function submitOrder() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(cart)
    };
    fetch(`${process.env.REACT_APP_BACKEND_API}/order`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCart([]);
      });
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.count * item.product_id.single_selling_price), 0);
  };

  return (
    <Box sx={{padding: 2}}>
      <Grid container spacing={2}>
        {cart.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.product_id._id}>
            <Paper sx={{padding: 2, display: 'flex', alignItems: 'center'}}>
              <Avatar alt={item.product_id.name} src={item.product_id.image}
                      sx={{width: 56, height: 56, marginRight: 2}}/>
              <Box sx={{flexGrow: 1}}>
                <Typography variant="subtitle1">{item.product_id.name}</Typography>
                <Typography variant="body2" color="text.secondary">Price:
                  ${item.product_id.single_selling_price}</Typography>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <IconButton size="small" onClick={() => handleItemCountChange(item.product_id._id, item.count - 1)}>
                    <RemoveIcon/>
                  </IconButton>
                  <Typography sx={{margin: '0 10px'}}>{item.count}</Typography>
                  <IconButton size="small" onClick={() => handleItemCountChange(item.product_id._id, item.count + 1)}>
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
          <Button onclick={submitOrder} variant="contained" color="primary" sx={{marginTop: 2}} fullWidth>
            Submit Order
          </Button>
          <Button onClick={clearCart} variant="outlined" color="error" sx={{marginTop: 1}} fullWidth>
            Clear Cart
          </Button>
        </Paper>
      </Grid>
    </Box>
  );

}

export default Cart;
