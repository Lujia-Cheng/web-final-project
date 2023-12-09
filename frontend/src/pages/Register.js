import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    address: '',
    kind: 'Consumer', // Assuming a default value
    business_category: '',
    annual_income: '',
    marriage_status: '',
    gender: '',
    age: '',
    income: '',
    admin_access_code: ''
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
        // login after register
        fetch(`${process.env.REACT_APP_BACKEND_API}/login`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            console.log('Success:', data);
            sessionStorage.setItem('userId', data.user?.id);
            if (data.user?.is_admin) {
              sessionStorage.setItem('isAdmin', 'true');
              navigate('/account');
            } else {
              sessionStorage.setItem('isAdmin', 'false');
              navigate('/');
            }

          })
          .catch((error) => {
            console.error('Error:', error);
          });
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
          <TextField fullWidth required label="Password"
                     helperText="Longer then 8 char which includes at least 1 lowercase, 1 uppercase, and 1 number, "
                     name="password" type="password" value={formData.password}
                     onChange={handleChange} margin="normal"/>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal"/>
          <TextField fullWidth label="Tester Invitation Code (unstable)" name="admin_access_code"
                     value={formData.admin_access_code} onChange={handleChange}
                     margin="normal"/>
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
