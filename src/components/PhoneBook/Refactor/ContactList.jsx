import React from "react";
import styles from '../Phonebook.module.css';
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../../Redux/contactSlice";
import { Report } from 'notiflix/build/notiflix-report-aio';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts) || [];
  const filter = useSelector((state) => state.contacts.filter) || '';
  const isDeleting = useSelector((state) => state.contacts.isDeleting);

  const filteredContacts = contacts.filter(
    (contact) => contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = (id) => {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      dispatch(deleteContact(id))
        .then(() => {
          Report.success(
            'Contact deleted',
            `Contact with name: "${contact.name}" was deleted`,
            'Okay',
          );
        })
        .catch(() => {
          Report.failure(
            'Failed to delete contact',
            'An error occurred while deleting the contact',
            'Okay',
          );
        });
    }
  };

  const handleClearContacts = async () => {
    try {
      const filteredContacts = contacts.filter(
        (contact) => contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
      );

      for (const contact of filteredContacts) {
        await dispatch(deleteContact(contact.id));
      }
      Report.success(
        'All contacts cleared',
        'The contacts were cleared',
        'Okay',
      );
    } catch (error) {
      Report.failure(
        'Failed to clear contacts',
        'An error occurred while clearing contacts',
        'Okay',
      );
    }
  };

  return (
    <div className={styles.container}>
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <Button
              onClick={() => handleDeleteContact(contact.id)}
              sx={{
                backgroundColor: '#3b52b2',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#2a3a92',
                },
                disabled: {
                  backgroundColor: '#ccc',
                  color: '#666',
                },
              }}
              disabled={isDeleting}
              startIcon={<DeleteIcon />}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </li>
        ))}
      </ul>
      <Button
        onClick={handleClearContacts}
        sx={{
          backgroundColor: '#3b52b2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2a3a92',
          },
          marginTop: theme => theme.spacing(2),
        }}
        startIcon={<ClearIcon />}
      >
        Clear Contacts
      </Button>
    </div>
  );
};

export default ContactList;
