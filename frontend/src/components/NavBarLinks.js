import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const NavBarLinks = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
    <Link component={RouterLink} to="/" sx={{ mx: 2, textDecoration: 'none', color: 'inherit' }}>Home</Link>
    <Link component={RouterLink} to="/all-products" sx={{ mx: 2, textDecoration: 'none', color: 'inherit' }}>All Products</Link>
    <Link component={RouterLink} to="/contact-us" sx={{ mx: 2, textDecoration: 'none', color: 'inherit' }}>Contact Us</Link>
    <Link component={RouterLink} to="/about-us" sx={{ mx: 2, textDecoration: 'none', color: 'inherit' }}>About Us</Link>
  </Box>
);

export default NavBarLinks;
