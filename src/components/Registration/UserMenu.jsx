import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, getCurrentUser } from '../../Redux/authSlice';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useLocation } from 'react-router-dom';
import css from '../../components/PhoneBook/Phonebook.module.css'

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  if (location.pathname !== '/contacts') {
    return null; 
  }

  return (
    <Paper className = {css.logaut}>
      {loading ? (
        <CircularProgress style={{ color: '#fff' }} />
      ) : isAuthenticated ? (
        <>
          <Typography variant="h6" sx={{ marginBottom: (theme) => theme.spacing(1) }}>
            Welcome, {user?.name || 'User'}!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{
              marginTop: (theme) => theme.spacing(0),
              backgroundColor: '#000',
              color: '000',
              borderRadius: 30,
              '&:hover': {
                backgroundColor: '#000',
              },
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <p style={{ color: 'bbb' , fontWeight: 'bold'}}>User not logged in</p>
      )}
    </Paper>
  );
};

export default UserMenu;
