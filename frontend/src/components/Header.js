import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SearchBar from './SearchBar'; // Your SearchBar component
import {Box, Link} from '@mui/material';

function Header() {
  return (
    <header>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="div">
                <RouterLink to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                  <img src="https://placehold.co/600x400?text=logo" alt="Logo" style={{maxHeight: '50px'}}/>
                </RouterLink>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <SearchBar/>
            </Grid>
            <Grid item xs={12} md={4} sx={{textAlign: {xs: 'center', md: 'right'}}}>
              <IconButton component={RouterLink} to="/cart" color="inherit">
                <ShoppingCartIcon/>
              </IconButton>
              <IconButton component={RouterLink} to="/login" color="inherit">
                <PersonIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>

        <Box sx={{display: 'flex', justifyContent: 'center', py: 1}}>
          <Link component={RouterLink} to="/" sx={{mx: 2, textDecoration: 'none', color: 'inherit'}}>Home</Link>
          <Link component={RouterLink} to="/all-products" sx={{mx: 2, textDecoration: 'none', color: 'inherit'}}>All
            Products</Link>
          <Link component={RouterLink} to="/best-sellers" sx={{mx: 2, textDecoration: 'none', color: 'inherit'}}>Best
            Sellers</Link>
          <Link component={RouterLink} to="/customer-service" sx={{mx: 2, textDecoration: 'none', color: 'inherit'}}>Customer
            Service</Link>
          <Link component={RouterLink} to="/contact" sx={{mx: 2, textDecoration: 'none', color: 'inherit'}}>Contact
            Us</Link>
          <Link component={RouterLink} to="/about" sx={{mx: 2, textDecoration: 'none', color: 'inherit'}}>About
            Us</Link>
        </Box>
      </AppBar>
    </header>
  );
}

export default Header;
