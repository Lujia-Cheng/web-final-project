import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import {AboutUs, Account, AllProducts, ContactUs, Home, Login, NotFound, Order, ProductDetail, Register} from './pages';
import Button from "@mui/material/Button";
import Cart from "./components/Cart";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import {CartProvider} from './contexts/CartContext';
import {CssBaseline} from "@mui/material";

function App() {
  useEffect(() => {

    // Send an empty GET request to wake up the backend
    async function wakeUpBackend() {
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_API, {
          method: 'GET',
        });
        if (response.ok) {
          console.log('Backend woken up successfully');
        } else {
          console.error('Failed to wake up backend');
        }
      } catch (error) {
        console.error('Error waking up backend:', error);
      }
    }

    wakeUpBackend();
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <CartProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <CssBaseline/>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order" element={<Order/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/all-products" element={<AllProducts/>}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/contact-us" element={<ContactUs/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Button onClick={scrollToTop} style={{position: 'fixed', bottom: '20px', right: '20px'}}>
          <ArrowCircleUpIcon/>
        </Button>
      </Router>
    </CartProvider>
  );
}

export default App;
