import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from './Registration/UserMenu';

import Button from '@mui/material/Button';

const Navigation = () => {
  const location = useLocation();
  const showMenu = location.pathname !== '/contacts';

  return (
    <nav>
      {showMenu && (
        <div style={{
          padding: '16px',
          color: 'black',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          fontWeight: 600,
          fontSize: '28px'
        }}>
          <div style={{ listStyle: 'none', padding: 0, display: 'flex',  gap: '566px', justifyContent: 'space-between', backgroundColor: 'rgba(36,74,50,0.14609593837535018' }}>
            <Button component={Link} to="/" style={{ color: '#fff', fontSize: '24px', fontWeight: 500, transition: 'color 0.3s ease-in-out', '&:hover': { color: '#FFC107' } }}>
              Home
            </Button>
            <Button component={Link} to="/register" style={{ color: '#fff', fontSize: '24px', fontWeight: 500, transition: 'color 0.3s ease-in-out', '&:hover': { color: '#FFC107' } }}>
              Register
            </Button>
            <Button component={Link} to="/login" style={{ color: '#fff', fontSize: '24px', fontWeight: 500, transition: 'color 0.3s ease-in-out', '&:hover': { color: '#FFC107' } }}>
              Login
            </Button>
          </div>
        </div>
      )}
      <UserMenu />
    </nav>
  );
};

export default Navigation;
