import React, {useState} from 'react';
import {Form, Button, Container, Row, Col, Alert} from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailError && email && password) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        });

        if (response.ok) {
          // Handle successful login
          console.log('Login successful');
        } else {
          // Handle errors
          console.log('Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="mt-4">
            <h2>Login</h2>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Log In
            </Button>
            <div className="mt-3">
              <a href="/register">Register</a> | <a href="/forgot-password">Forgot Password?</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
