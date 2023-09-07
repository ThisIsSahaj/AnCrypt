import Banner from '../Components/Banner/Banner';
import CoinsTable from '../Components/CoinsTable';
import { CryptoState } from '../CryptoContext';




const Homepage = () => {
  
  const {watchlist, setPublicPortfolio} = CryptoState();
  setPublicPortfolio(watchlist); 
  
  

  return (<>
  
  <Banner />
  <CoinsTable/>
 
  </>  
  )
}

export default Homepage;