import React from 'react';
import {Link} from 'react-router-dom';
import SearchBar from "./SearchBar";
import {Container, Row, Col, Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import {BsCart, BsPerson} from 'react-icons/bs';
function Header() {
  return (
    <header>
      <Container fluid>
        {/* First Row */}
        <Row className="align-items-center">
          <Col xs={3} md={2}>
            <Navbar.Brand href="/">
              <img src="https://placehold.co/600x400?text=logo" alt="Logo" style={{maxHeight: '50px'}}/>
            </Navbar.Brand>
          </Col>
          <Col xs={6} md={8}>
            <SearchBar/>
          </Col>
          <Col xs={3} md={2} className="text-right">
            <Button variant="link">
              <BsCart/>
            </Button>
            <Button variant="link">
              <BsPerson/>
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col>
            <Nav className="justify-content-center">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/all-products">All Products</Nav.Link>
              <Nav.Link href="/best-sellers">Best Sellers</Nav.Link>
              <Nav.Link href="/customer-service">Customer Service</Nav.Link>
              <Nav.Link href="/contact">Contact Us</Nav.Link>
              <Nav.Link href="/about">About Us</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
