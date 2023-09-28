import Banner from '../Components/Banner/Banner';
import CoinsTable from '../Components/CoinsTable';
import TradingView from '../Components/tradingView';
import URLInput from '../Components/urlInput';
import { CryptoState } from '../CryptoContext';




const Homepage = () => {
  
  const {watchlist, setPublicPortfolio} = CryptoState();
  setPublicPortfolio(watchlist); 
  
  

  return (<>
  
  <Banner />
  <CoinsTable/>
  <URLInput/>
 
  </>  
  )
}

export default Homepage;