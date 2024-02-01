import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Home from './Refactor/home';
import ContactForm from './Refactor/ContactForm';
import Filter from './Refactor/Filter';
import ContactList from './Refactor/ContactList';
import { fetchContacts } from '../../Redux/contactSlice';

const styles = {
  container: {
    width: 1000,
    margin: '0 auto',
    marginTop: 50,
    marginBottom: 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 3,
  },
  title: {
    marginBottom: 4,
    fontSize: 36,
  },
  

  contactsSection: {
    marginTop: 60,
    padding: 40,
    borderRadius: '35px',
    color: 'fff',
    backgroundColor: 'rgba(34,59,43,0.7)',
    border: '1px solid #00c2f5'
    
  },
  loading: {
    marginBottom: 2,
    fontSize: 18,
    color: 'black',
  },
  error: {
    marginBottom: 2,
    fontSize: 18,
    color: 'red',
  },
  
  
};

const Phonebook = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div style={styles.container}>
      {isAuthenticated ? (
        <>
          <ContactForm />
        </>
      ) : (
        <Home />
      )}

      {isAuthenticated && (
        <div style={styles.contactsSection}>
          <Typography variant="h2" style={{ margin: '40px 0', fontSize: '36px', fontWeight: 600, color: 'fff' }}>
            Contacts
          </Typography>
          <Filter />
          {isLoading && <p style={styles.loading}>Loading...</p>}
          {error && <p style={styles.error}>Error: {error}</p>}
          <ContactList />
        </div>
      )}
    </div>
  );
};

export default Phonebook;
