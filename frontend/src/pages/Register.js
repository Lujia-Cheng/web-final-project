import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    address: '',
    kind: '',
    business_category: '',
    annual_income: '',
    marriage_status: '',
    gender: '',
    age: '',
    income: '',
    is_admin: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
          {/* Include all the necessary form fields */}
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Kind" name="kind" value={formData.kind} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Business Category" name="business_category" value={formData.business_category} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Annual Income" name="annual_income" value={formData.annual_income} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Marriage Status" name="marriage_status" value={formData.marriage_status} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Age" name="age" type="number" value={formData.age} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Income" name="income" type="number" value={formData.income} onChange={handleChange} margin="normal" />
          <FormControlLabel control={<Switch checked={formData.is_admin} onChange={handleChange} name="is_admin" />} label="Admin" />
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
