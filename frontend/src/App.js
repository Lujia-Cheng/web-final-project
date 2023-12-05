import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
// import Product from './pages/Product';
import './App.css';
import NotFound from "./pages/NotFound";

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
        {/* todo Add all routes as needed */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <button onClick={scrollToTop} style={{position: 'fixed', bottom: '20px', right: '20px'}}>
        Back to Top
      </button>
      <Footer/>
    </Router>
  );
}

export default App;
