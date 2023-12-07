import React, {useEffect, useState} from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    // Function to fetch cart from the server
    const fetchCartFromServer = async (userId) => {
      try {
        const response = await fetch(`${process.env.BACKEND_API}/cart?buyer_id=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setCart(data);
          localStorage.setItem('cart', JSON.stringify(data)); // Update local storage
        } else {
          console.error('Failed to fetch cart from server');
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    // Retrieve userId from local storage
    const userId = localStorage.getItem('userId'); // todo if login stored userId in local storage properly
    if (userId) {
      // Attempt to fetch cart from local storage
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      } else {
        fetchCartFromServer(userId); // Fetch from server if not found in local storage
      }
    } else {
      console.log('User ID not found');
      // Handle the scenario where the user ID is not available
    }
  }, []);

  const handleItemCountChange = (productId, delta) => {
    setCart(currentCart => currentCart.map(item => {
      if (item.product_id._id === productId) {
        return {...item, count: Math.max(1, item.count + delta)}; // Ensure count doesn't go below 1
      }
      return item;
    }));
    // todo update server with new cart count
  };
  if (!cart) {
    return <div>Loading cart...</div>;
  }

  return ( // todo move card into separate component
    <Grid container spacing={2}>
      {cart.map(item => (
        <Grid item xs={12} sm={6} md={4} key={item.product_id._id}>
          <Card sx={{maxWidth: 345}}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={item.product_id.name}
                height="140"
                image={item.product_id.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.product_id.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${item.product_id.single_selling_price} x {item.count} =
                  ${item.product_id.single_selling_price * item.count}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <IconButton size="small" onClick={() => handleItemCountChange(item.product_id._id, -1)}>
                <AddIcon/>
              </IconButton>
              <Typography variant="body1">{item.count}</Typography>
              <IconButton size="small" onClick={() => handleItemCountChange(item.product_id._id, 1)}>
                <RemoveIcon/>
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Cart;
