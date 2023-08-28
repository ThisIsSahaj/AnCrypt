// import { makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header'
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';
import Alert from './Components/alert';



function App() {
  // require('dotenv').config();
  
  // const useStyles = makeStyles(() => ({
  // App: {
  //   backgroundColor:"#14161a",

    // backgroundColor: "#040F0F",
    
  // },
  // }));
  // const classes= useStyles;
  
  
  return (
     
    <BrowserRouter>
    <div className='mainDiv'>
        <Header />        
        <Routes>

        <Route path='/' element={<Homepage/>} exact/>
        <Route path='/coins/:id' element={<CoinPage/>}/> 
        </Routes>
    </div>
    <Alert/>
    </BrowserRouter>

    
   
  );
}

export default App;
