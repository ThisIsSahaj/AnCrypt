import { Button, createTheme, makeStyles, TextField, ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';
import {PiPaperPlaneRightFill} from 'react-icons/pi'

const useStyles = makeStyles((theme) => ({
    main:{
        textAlign:"center",
        padding:24,
        
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      width: '40%',
      margin:'auto',
      [theme.breakpoints.down("md")]: {
        width:'100%'
      },

    },
    input: {
      flex: 1,
    },
    button: {
      backgroundColor: 'orange', 
    
    
      color: 'black',
      '&:hover': {
        backgroundColor: '#d58a02', 
      },
    },
    heading:{
        fontSize:24,
        marginBottom:24,
        [theme.breakpoints.down("md")]: {
            fontSize:18,
          },
    },
  }));

const URLInput = () => {
  const [inputURL, setInputURL] = useState('');
  const classes = useStyles();   

  const handleURLChange = (e) => {
    setInputURL(e.target.value);
  };

  const navigateToURL = () => {
    // to navigate to the provided URL
    window.location.href = inputURL;
  };


  const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
        <div className={classes.main}>
            <p className={classes.heading}>Enter a Public WatchList's URL</p>
    <div className={classes.container}>
      <TextField
      className={classes.input}
        type="text"
        label="Enter URL"
        variant="outlined"
        size="small"
        value={inputURL}
        onChange={handleURLChange}
      />
      <Button  variant="contained"
        size="small" className={classes.button} onClick={navigateToURL}><PiPaperPlaneRightFill style={{height:"30px", width:"18px"}}/></Button>
    </div>
    </div>
    </ThemeProvider>
  );
};

export default URLInput;
