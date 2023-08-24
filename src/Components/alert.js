import { Snackbar } from '@material-ui/core';
import React from 'react'
import { CryptoState } from '../CryptoContext';
import MuiAlert from '@material-ui/lab/Alert'

const Alert = () => {
  
   const { alert, setAlert } = CryptoState();
//    const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    // setOpen(false);
    setAlert({open: false});
  };
  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose} > 
    
   <MuiAlert
   onClose={handleClose}
   elevation={10}
   variant="filled"
   severity={alert.type}
   >
   { alert.message }
   </MuiAlert>
    </Snackbar>
  )
}

export default Alert;