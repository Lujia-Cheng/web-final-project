import React from 'react';
import { Grid } from '@mui/material';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

function Home() {
  const products = useProducts(true, 30); // Fetch and shuffle 30 products

  return (
    <div>
      <Grid container spacing={2} padding={10}>
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </div>
  );
}

export default Home;
