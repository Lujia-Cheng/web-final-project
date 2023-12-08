import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Register fail', error);
    }
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth required label="Email" name="email" type="email" value={formData.email}
                     onChange={handleChange} margin="normal"/>
          <TextField fullWidth required label="Password" name="password" type="password" value={formData.password}
                     onChange={handleChange} margin="normal"/>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal"/>
          <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange}
                     margin="normal"/>
          <TextField fullWidth label="Kind" name="kind" value={formData.kind} onChange={handleChange} margin="normal"/>

          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
