import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Logo = () => (
  <Typography variant="h6" component="div">
    <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <img src="https://placehold.co/600x400?text=logo" alt="Logo" style={{ maxHeight: '50px' }}/>
    </RouterLink>
  </Typography>
);

export default Logo;
