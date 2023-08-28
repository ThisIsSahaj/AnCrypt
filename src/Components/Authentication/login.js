import React from 'react'
import { Box, Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { async } from '@firebase/util';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Login = ({handleClose}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
   const {setAlert} = CryptoState();

    const handleSubmit = async () => {
       if(!email || !password){
        setAlert({
          open: true,
          message: "Please fill all the fields",
          type: "error",
        });
        return;
       }
       
       try {
        const result = await signInWithEmailAndPassword(auth,email,password);
        setAlert({
          open: true,
          message: `Login Successful. Welcome back ${result.user.email}`,
          type: "success",
        });


       } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
       }



    };
    
    return (
        <Box 
 p={3}
 style={{display: "flex", flexDirection: "column", gap: "20px"}}
 >
  
  <TextField
  variant='outlined'
  type='email'
  label='Enter email'
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  fullWidth
  />
  <TextField
  variant='outlined'
  type='password'
  label='Enter Password'
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  fullWidth
  />
  
  <Button 
  variant='container'
  size='large'
  style={{backgroundColor: "orange", color:"black"}}
  onClick={handleSubmit}
   >
    Login
   </Button>
 </Box>
  )
}

export default Login;