import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const {id} = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_API}/product/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  return (
    <Card sx={{maxWidth: '90vw', maxHeight: '70vh', margin: 'auto'}}>
      <CardMedia
        component="img"
        alt={product.name}
        image={product.image}
        sx={{width: 'auto', height: '50%'}}  // Adjusts image size to fill card
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {product.name}
        </Typography>
        <Typography variant="h5">
          Category: {product.kind}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.single_selling_price}
        </Typography>
        <Typography variant="body3">
          {product.inventory_amount} left in stock
        </Typography>
        {/* todo add add to cart button here */}

      </CardContent>
    </Card>
  );
}

export default ProductDetail;