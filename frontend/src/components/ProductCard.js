import React from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {useCart} from "../contexts/CartContext";
import {useNavigate} from 'react-router-dom';

const ProductCard = ({product}) => {
  const {addToCart} = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card sx={{maxWidth: 345}}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={product.name}
            height="140"
            image={product.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body1">
              ${product.single_selling_price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.inventory_amount} left in stock
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button color="primary" onClick={() => navigate(`/product/${product._id}`)}>
            View Details
          </Button>
          <Button color="primary" variant="contained" onClick={() => handleAddToCart(product)}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
