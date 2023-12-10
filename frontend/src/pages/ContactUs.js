import React, {useRef, useState} from 'react';
import {Avatar, Box, Button, Container, Paper, TextField, Typography} from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';

function ContactUs() {
  const [userData, setUserData] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    message: '',
  });
  const [setFile] = useState(null);
  const fileInputRef = useRef(null);

  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="lg">
      <Box my={4} sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{flexGrow: 1, marginRight: 2}}>
          <Typography variant="h3" gutterBottom>
            Questions or Comments?
          </Typography>
          <Typography variant="body1" sx={{mb: 4}}>
            If you have any questions, comments, or need help, please fill out the form below.
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField fullWidth label="Full Name" name="fullname" value={userData.fullname} onChange={onChangeHandler}
                       margin="normal"/>
            <TextField fullWidth label="Email" name="email" type="email" value={userData.email}
                       onChange={onChangeHandler} margin="normal"/>
            <TextField fullWidth label="Phone Number" name="phonenumber" value={userData.phonenumber}
                       onChange={onChangeHandler} margin="normal"/>
            <TextField fullWidth label="Message" name="message" multiline rows={4} value={userData.message}
                       onChange={onChangeHandler} margin="normal"/>
            <input type="file" onChange={onFileChangeHandler} ref={fileInputRef} hidden/>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2}}>
              <Button onClick={() => fileInputRef.current.click()} sx={{my: 2}}>Upload File</Button>
              <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Box>
          </form>
        </Box>
        <Paper elevation={3} sx={{padding: 2, maxWidth: 300}}>
          <Typography variant="h5" gutterBottom>Contact Us</Typography>
          <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
            <Avatar sx={{mr: 1}}><RoomIcon/></Avatar>
            <Typography variant="body1">1234 Main Street, Pittsburgh, PA 15213</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
            <Avatar sx={{mr: 1}}><PhoneIcon/></Avatar>
            <Typography variant="body1">123-456-7890</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
            <Avatar sx={{mr: 1}}><EmailIcon/></Avatar>
            <Typography variant="body1">contact@some.inc</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
            <Avatar sx={{mr: 1}}><PublicIcon/></Avatar>
            <Typography variant="body1">www.example.com</Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default ContactUs;
