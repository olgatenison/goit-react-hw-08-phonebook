import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      await dispatch(loginUser({ email, password }));
      setEmail('');
      setPassword('');
      navigate('/contacts');
    } catch (error) {
      
    }
  }
  

  return (
    <div
      sx={{
        padding: theme => theme.spacing(3),
        maxWidth: 100,
        margin: 'auto',
        marginTop: theme => theme.spacing(3),
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme => theme.spacing(2),
          background: 'gren',
        }}
        onSubmit={handleLogin}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
