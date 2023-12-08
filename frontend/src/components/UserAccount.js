import React, {useEffect, useState} from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

const UserProfile = () => {
  const [userData, setUserData] = useState({email: '', address: ''});
  const [userInput, setUserInput] = useState({email: '', address: ''});
  const [orderHistory, setOrderHistory] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/user/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData({email: data.email, address: data.address});
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const queryString = new URLSearchParams({buyer_id: userId}).toString();
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/order-history?${queryString}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrderHistory(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if (userId) {
      fetchOrderHistory();
    }
  }, [userId]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserInput(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      email: userInput.email || userData.email,
      address: userInput.address || userData.address,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/user/${userId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updateData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedData = await response.json();
      setUserData({email: updatedData.email, address: updatedData.address});
      setUserInput({email: '', address: ''}); // Reset the form inputs
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleReturnHome = () => {
    window.location.href = '/';
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Paper elevation={2} sx={{padding: 2, marginBottom: 2}}>
          <Typography variant="h6">Contact Information</Typography>
          <Divider sx={{marginBottom: 2}}/>
          <Typography>Email: {userData.email}</Typography>
          <Typography>Address: {userData.address}</Typography>
        </Paper>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="New Email Address"
            name="email"
            autoComplete="email"
            placeholder="Enter new email"
            value={userInput.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="New Address"
            type="text"
            id="address"
            autoComplete="current-address"
            placeholder="Enter new address"
            value={userInput.address}
            onChange={handleChange}
          />
          <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2}}>

            <Button onClick={handleReturnHome} variant="contained">
              Return
            </Button>
            <Button type="submit" variant="contained" color="error">
              Update Profile
            </Button>
          </Box>
        </Box>
        <Paper elevation={2} sx={{padding: 2, marginTop: 2}}>
          <Typography variant="h6">Order History</Typography>
          <Divider sx={{marginBottom: 2}}/>
          <List>
            {orderHistory.map((order) => (
              <ListItem key={order._id}>
                <ListItemAvatar>
                  <Avatar src={order.product_id.image} alt={order.product_id.name}/>
                </ListItemAvatar>
                <ListItemText
                  primary={`${order.product_id.name} - Quantity: ${order.count}`}
                  secondary={`Order Date: ${new Date(order.create_at).toLocaleDateString()}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserProfile;
