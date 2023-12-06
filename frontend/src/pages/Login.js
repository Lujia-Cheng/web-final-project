import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';

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
          console.log('Login successful');
        } else {
          console.log('Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            startIcon={<GitHubIcon/>}
            component="a"
            href="/auth/github"
          >
            Log In with GitHub
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
