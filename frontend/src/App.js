import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import {Admin, Home, Login, NotFound, Order} from './pages';
import Button from "@mui/material/Button";

function App() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order" element={<Order/>}/>
        {/* todo Add all routes */}


        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Button onClick={scrollToTop} style={{position: 'fixed', bottom: '20px', right: '20px'}}>
        Back to Top
      </Button>
      <Footer/>
    </Router>
  );
}

export default App;
