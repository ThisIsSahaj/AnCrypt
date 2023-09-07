import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header'
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';
import Alert from './Components/alert';
import Portfolio from './Components/Portfolio';
import PublicPort from './Pages/PublicPort';




function App() {
  
  return (
     
    <HashRouter>
    <div className='mainDiv'>
        <Header />        
        <Routes>

        <Route path='/' element={<Homepage/>} exact/>
        <Route path='/coins/:id' element={<CoinPage/>}/> 
        <Route path='/portfolio/:user' element={<Portfolio/>} />
        <Route path="/publicPortfolio/:userId" element={<PublicPort/>} />
        </Routes>
    </div>
    <Alert/>
    </HashRouter>

    
   
  );
}

export default App;
