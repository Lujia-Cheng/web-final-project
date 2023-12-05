import React from 'react';
import {Container} from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start">
      <Container className="p-4">
        <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
          © 2023 Example:
          <a className="text-dark" href="https://www.example.com/">example.com</a>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
