import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // Redirect if already logged in as admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
      window.location.href = '/admin';
    }
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value.trim(),
    });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Replace with your actual API call
      const response = await fetch(`${process.env.BACKEND_API}/login`, { // todo check if this is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user?.isAdmin) {
          // Store admin state locally
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('user', data.user.id); // todo check if this is correct
          window.location.href = '/admin';
        } else {
          localStorage.setItem('isAdmin', 'false');
          window.location.href = '/cart';
        }
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Log In
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{mt: 2, mb: 2, backgroundColor: '#000', '&:hover': {backgroundColor: '#333'}}}
            // startIcon={<GitHubIcon/>}
            component="a"
            href="/register"
          >
            Click to register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
