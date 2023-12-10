import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Button, Card, CardContent, CardMedia, Typography} from '@mui/material';
import {useCart} from "../contexts/CartContext";

const ProductDetail = () => {
  const navigate = useNavigate();
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
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 3}}>
      <Card>

        <CardContent>
          <CardMedia
            component="img"
            alt={product.name}
            image={product.image}
          />
          <Typography gutterBottom variant="h4" component="div">
            {product.name}
          </Typography>
          <Typography variant="body1">
            Category: {product.kind}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            ${product.single_selling_price}
          </Typography>
          <Typography variant="body2">
            {product.inventory_amount} left in stock
          </Typography>
          <Typography variant="h5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Typography>
          <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2}}>
            <Button color="primary" variant="contained" onClick={() => navigate(-1)} sx={{mt: 2}}>
              Back
            </Button>
            <Button  color="primary" variant="contained" onClick={handleAddToCart} sx={{mt: 2}}>
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>);
};

export default ProductDetail;
