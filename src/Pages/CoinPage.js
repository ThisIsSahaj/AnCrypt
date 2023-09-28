import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { makeStyles, styled } from '@material-ui/core/styles';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../Components/Banner/Carousel';
import CoinInfo from '../Components/coinInfo';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { async } from '@firebase/util';
import { ButtonAuthModal } from '../Components/Authentication/AuthModal';
import Skeleton from 'react-loading-skeleton';
import CoinSkeleton from '../Components/coinSkeleton';
import TradingView from '../Components/tradingView';



const useStyles = makeStyles((theme) => ({
  container: {
    
    display: "flex",
    [theme.breakpoints.down("md")]:{
      flexDirection: "column",
      alignItems: "center"
  },
},
sidebar: {
  width: "30%",
  
  [theme.breakpoints.down("md")] : {
    width: "100%",
    
  },
  display: "flex", 
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
  padding: "20px",
  
},
heading:{
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
  color: "orange",
 
},
coinData:{
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
  fontSize: 24,
  color: "orange",
  alignItems: "center",
  [theme.breakpoints.down("md")] : {
    fontWeight: "normal",
    fontSize:1,
  },
},
description:{
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
},
tradingView:{
  width:"100%",
  [theme.breakpoints.down("md")] : {
    display: "none",
  },

},

}));


const CoinPage = () => {
 
 const { id } = useParams();
 const [coin, setCoin] = useState();
 const {currency, symbol, user, watchlist, setAlert, publicPortfolio, setPublicPortfolio, loading} = CryptoState();
 
 setPublicPortfolio(watchlist); 
 
 const fetchCoin = async () => {
  const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
};


useEffect(() => {
  setTimeout(() => {
    fetchCoin();

  }, 2000)
  
 }, []);



// Watchlist working function
const inWatchlist = watchlist.includes(coin?.id);


const addToWatchlist= async() => {
  const coinRef = doc(db, "watchlist", user.uid);
  
  try {
     await setDoc(coinRef,{
            coins:watchlist?[...watchlist, coin?.id]:[coin?.id],
          });  

          setAlert({
            open: true,
            message: `${coin.name} Added to your Watchlist!`,
            type: "success",
          });
  } catch (error) {
     setAlert({
      open: true,
      message: error.message,
      type: "error",
     });
  }
const publicRef = doc(db, "publicPortfolio", user.uid);
  
  try {
     await setDoc(publicRef,{
            coins:publicPortfolio?[...publicPortfolio, coin?.id]:[coin?.id],
          });  

         
  } catch (error) {
    
  }
};

//Remove from Watchlist function
const removeFromWatchlist = async() => {
  const coinRef = doc(db, "watchlist", user.uid);
  
  try {
     await setDoc(coinRef,{
            coins: watchlist.filter((watch) => watch !== coin?.id)}, 
            {merge: 'true'}
          );  

          setAlert({
            open: true,
            message: `${coin.name} Removed from your Watchlist!`,
            type: "success",
          });
  } catch (error) {
     setAlert({
      open: true,
      message: error.message,
      type: "error",
     });
  };
  const publicRef = doc(db, "publicPortfolio", user.uid);
  
  try {
     await setDoc(publicRef,{
            coins: publicPortfolio.filter((watch) => watch !== coin?.id)}, 
            {merge: 'true'}
          );  

         
  } catch (error) {
     
  };
};




  const classes = useStyles();

// if (!coin) return <LinearProgress style={{backgroundColor: "orange"}}/>;

if (!coin) return <CoinSkeleton/>;
return (<>
     <div className={classes.container}>
      <div className={classes.sidebar}>
        
       <img src={coin?.image.large} 
      alt={coin?.name} 
      height="200"
      style={{marginBottom: 20}}
      />


      <Typography variant="h3"  className={classes.heading}>
        {coin?.name}
      </Typography>
     
      <Typography variant="subtitle1" className={classes.description}>
      {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
      </Typography>
       
      
      <div className="marketData">
        <span style={{display: "flex"}} className={classes.coinData}>
          <Typography variant='h5' >
            Rank:
          </Typography>
          &nbsp; &nbsp;
          <Typography variant='h6' style={{fontFamily: "Montserrat", color: "white"}}>
          {coin?.market_cap_rank}
          </Typography>
        </span>
        <span style={{display: "flex"}} className={classes.coinData}>
          <Typography variant='h5' >
            Current Price:
          </Typography>
          &nbsp; &nbsp;
          <Typography variant='h6' style={{fontFamily: "Montserrat", color:"white"}}>
          {symbol}{" "}
          {numberWithCommas(
            coin?.market_data.current_price[currency.toLowerCase()]
          )}
          </Typography>
        </span>
        <span style={{display: "flex"}} className={classes.coinData}>
          <Typography variant='h5' >
            Market Cap:{" "}
          </Typography>
          &nbsp; &nbsp;
          <Typography variant='h6' style={{fontFamily: "Montserrat", color:"white"}}>
          {numberWithCommas(
            coin?.market_data.market_cap[currency.toLowerCase()]
            .toString()
            .slice(0, -6)
          )} M
          </Typography>
        </span>
        {/* WatchList button  */}
        
        
         {user ?  (<Button 
          variant='outlined'
          style={{width:"100%", height: 40, 
          backgroundColor: inWatchlist ? "red" : "orange",}}
          onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
           
          >
            
            {inWatchlist ? "Remove from Portfolio" : "Add to Portfolio"}
          </Button>)
          :<ButtonAuthModal/>
          }
         {/* {user &&  <Button 
          variant='outlined'
          style={{width:"100%", height: 40, 
          backgroundColor: inWatchlist ? "red" : "orange",}}
          onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
           
          >
            
            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </Button>
          } */}
        
      </div>
        
        {/* <Tabs/>  */}

        

      {/* chart */}
      
      </div>
      
      <CoinInfo coin={coin} />

     </div>
    
      {/* Trading View */}
      <div  className={classes.tradingView} >
        <TradingView coin={coin.symbol} />
      </div> 

    </>
  );
};

export default CoinPage;
