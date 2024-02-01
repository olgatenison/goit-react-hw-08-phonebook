import React from 'react';
import Paper from '@mui/material/Paper';



const styles ={ 
    message: {
        color: '#fff',
        backgroundColor: 'fff',
        padding: 4,
        borderRadius: '38px',
        textAlign: 'center',
        marginTop: 2,
        width: '100%',
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        '& .MuiButtonRoot': { 
          marginLeft: 1,
          
          transition: 'color 0.3s ease-in-out',
          fontSize: '36px',
          borderRadius: '20px',
          '&:hover': {
            backgroundColor: '#1b849a',
          },
        },
      },
}

const Home = () => {
  return (
    <Paper style={styles.Home}>
      
    </Paper>
  );
};

export default Home;
