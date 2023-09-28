import { AppBar, Button, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography, withTheme } from '@material-ui/core';
import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/userSidebar';


const useStyles= makeStyles ((theme)=> ({
  title: {
    flex: 1,
    [theme.breakpoints.down("md")]: {
      marginLeft:"-20px",
    },
    color: "orange",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
    zIndex:"1",
  },
  watchlist:{
   color: "orange",
   fontFamily: "Montserrat",
   fontWeight: "normal",
   cursor: "pointer",
   margin: "0px 15px", 
  },

}))

const Header = () => {
  const classes= useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency, user}= CryptoState();
 

  const darkTheme = createTheme({ 
    palette: {
      primary: {
       main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <div>
      <ThemeProvider theme={darkTheme} >
     <AppBar color='transparent' position='static' >
       <Container>
         <Toolbar>
          
           <Typography onClick={()=> navigate('/') } className={classes.title} variant='h6'>AnCrypt</Typography>
          

           {user && <Link className={classes.watchlist} to={`/portfolio/${user.displayName || user.email}`}>Watchlist</Link>  } 

           
           {/* <Wallet/> */}


             

           <Select variant="outlined" style={{width:100, height:40, marginRight:15, zIndex:"1",}}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
           >

            <MenuItem value={"USD"}>USD $</MenuItem>
            <MenuItem value={"INR"}>INR ₹</MenuItem>
            <MenuItem value={"GBP"}>GBP £</MenuItem>
            <MenuItem value={"EUR"}>EUR €</MenuItem>
            <MenuItem value={"JPY"}>JPY ¥</MenuItem>

           </Select>
          <div  style={{zIndex:"1"}}>
          
          {user ? <UserSidebar /> :  <AuthModal/>}
          </div>
         </Toolbar>
       </Container>
     </AppBar>
     </ThemeProvider>
    </div>
  );
}

export default Header;
