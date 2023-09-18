import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header'
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';
import Alert from './Components/alert';
import Portfolio from './Components/Portfolio';
import PublicPort from './Pages/PublicPort';
import {SkeletonTheme} from "react-loading-skeleton"; 
import 'react-loading-skeleton/dist/skeleton.css'




function App() {
  
  return (
    //  <SkeletonTheme baseColor="#313131" highlightColor="#525252">
     <SkeletonTheme baseColor="#202020" highlightColor="#525252">
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
    </SkeletonTheme>
    
   
  );
}

export default App;
