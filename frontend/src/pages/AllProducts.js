import React, {useEffect, useState} from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import Button from "@mui/material/Button";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products from server');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
      fetchAllProducts().then(r => console.log(r));
    }, []
  )

  return (
    <div>
      <Grid container spacing={2} padding={10}>
        {products.map(product => ( // todo selected random products
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product._id}>
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
                  <Typography variant="body2" color="text.secondary">
                    ${product.single_selling_price}
                  </Typography>
                  <Typography variant="body3">
                    {product.inventory_amount} left in stock
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Add to Cart
                </Button>
                <Button size="small" color="primary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllProducts;