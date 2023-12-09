import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Button, Card, CardContent, CardMedia, Typography} from '@mui/material';
import {useCart} from "../contexts/CartContext";


const ProductDetail = () => {
  const {cart, setCart} = useCart();
  const [product, setProduct] = useState({});
  const {id} = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_API}/product/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  const handleAddToCart = () => {
    let newCart;
    const existingItem = cart.find(item => item.product._id === product._id);
    if (existingItem) {
      newCart = cart.map(item => {
        if (item.product._id === product._id) {
          return {...item, count: item.count + 1};
        }
        return item;
      });
    } else {
      newCart = [...cart, {product, count: 1}];
    }
    setCart(newCart);
  };

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: 3}}>
      <Card sx={{
        maxWidth: '80vw',
        maxHeight: '80vh',
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>

        <CardContent sx={{maxHeight: '50%', overflow: 'auto'}}>
          <CardMedia
            component="img"
            alt={product.name}
            image={product.image}
            sx={{maxHeight: '50%', objectFit: 'cover', width: '100%'}} // Adjusts image size
          />
          <Typography gutterBottom variant="h4" component="div">
            {product.name}
          </Typography>
          <Typography variant="h5">
            Category: {product.kind}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.single_selling_price}
          </Typography>
          <Typography variant="body2">
            {product.inventory_amount} left in stock
          </Typography>
          <Button size="large" color="primary" variant="contained" onClick={handleAddToCart} sx={{mt: 2}}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>);
};

export default ProductDetail;
