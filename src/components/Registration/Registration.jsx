import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 7) {
      setPasswordError('Password must be at least 7 characters long');
      return;
    } else {
      setPasswordError('');
    }

    try {
      await dispatch(registerUser({ name, email, password }));
      setName('');
      setEmail('');
      setPassword('');
      setPasswordError('');
      setEmailError('');
      navigate('/contacts');
    } catch (error) {
      if (error.message === 'Email is already in use. Please use a different email.') {
        setEmailError(error.message);
      } else if (error.message === 'Unexpected error during registration.') {
        toast.error('Registration failed. Please try again.');
      } else {
        toast.error('Email is already in use. Please use a different email.');
      }
    }
  };

  return (
    <div
      sx={{
        padding: theme => theme.spacing(3),
        maxWidth: 400,
        margin: 'auto',
        marginTop: theme => theme.spacing(3),
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme => theme.spacing(2),
          background: 'white',
        }}
        onSubmit={handleRegister}
      >
        <TextField
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          required
          error={!!emailError}
          helperText={emailError}
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          required
          error={!!passwordError}
          helperText={passwordError}
        />

        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
