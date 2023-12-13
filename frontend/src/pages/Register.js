import React, {useState} from 'react';
import {Box, Button, CircularProgress, Container, TextField, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    admin_access_code: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validatePassword = (password) => {
    // Password validation
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  }

  const registerUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration error");
    }
  }

  const loginUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login error");
    }

    const data = await response.json();
    console.log('Success:', data);
    sessionStorage.setItem('userId', data.user?.id);
    sessionStorage.setItem('isAdmin', data.user?.is_admin ? 'true' : 'false');
    navigate(data.user?.is_admin ? '/account' : '/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validatePassword(formData.password)) {
      setError("Invalid password. Please ensure it meets the requirements.");
      return;
    }

    setLoading(true);
    try {
      await registerUser();
      await loginUser();
    } catch (error) {
      console.error('Registration/Login failed:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth required label="Email" name="email"
            type="email" value={formData.email}
            onChange={handleChange} margin="normal"
          />
          <TextField
            fullWidth required label="Password"
            helperText="Password requirement: (>= 8 characters, >= 1 uppercase, >= 1 lowercase, >= 1 number). And please use a burner password like StrongPassword@123 since it'll be passed through an unsecured channel into a testing database."
            name="password" type="password"
            value={formData.password} onChange={handleChange}
            margin="normal"
          />
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            fullWidth label="Name" name="name"
            value={formData.name} onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth label="Admin Access Code" name="admin_access_code"
            value={formData.admin_access_code} onChange={handleChange}
            margin="normal"
            helperText="See README.md if you want to register as Admin"
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24}/> : ' Register'}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
