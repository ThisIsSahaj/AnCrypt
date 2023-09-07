// import { makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header'
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';
import Alert from './Components/alert';
import Portfolio from './Components/Portfolio';
import PublicPortfolio from './Components/publicPortfolio';




function App() {
  
  return (
     
    <BrowserRouter>
    <div className='mainDiv'>
        <Header />        
        <Routes>

        <Route path='/' element={<Homepage/>} exact/>
        <Route path='/coins/:id' element={<CoinPage/>}/> 
        <Route path='/portfolio/:user' element={<Portfolio/>} />
        <Route path="/user/:userId" element={<PublicPortfolio/>} />
        </Routes>
    </div>
    <Alert/>
    </BrowserRouter>

    
   
  );
}

export default App;
