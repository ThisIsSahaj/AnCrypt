import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
// import { makeStyles, styled } from '@material-ui/core/styles';
import { LinearProgress, Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../Components/Banner/Carousel';
import CoinInfo from '../Components/coinInfo';



const CoinPage = () => {
 
 const { id } = useParams();
 const [coin, setCoin] = useState();
 const {currency, symbol} = CryptoState();
 
//  console.log(id);
 const fetchCoin = async () => {
  const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
};
console.log(coin);
useEffect(() => {
 fetchCoin();
 // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

// const useStyles = makeStyles((theme) => ({
//   container: {
//     border: "2px solid red",
//     display: "flex",
//     [theme.breakpoints.down("md")]:{
//       flexDirectionirection: "column",
//       alignItems: "center",
//   },
// },
// sidebar: {
//   width: "30%",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   marginTop: 25,
//   borderRight: "2px solid grey",
  
// },

// }));

// const useStyles = styled('div')(
//   ({ theme }) => 
//   'border: "2px solid red",
//       display: "flex",
//       [theme.breakpoints.down("md")]:{
//         flexDirectionirection: "column",
//         alignItems: "center",'

// );

  // const classes = useStyles

if (!coin) return <LinearProgress style={{backgroundColor: "orange"}}/>;

return (<>
     <div className='container'>
      <div className='sidebar'>
        
      <img src={coin?.image.large} 
      alt={coin?.name} 
      height="200"
      style={{marginBottom: 20}}
      />
      

      <Typography variant="h3"  className='coinHeading coinName'>
        {coin?.name}
      </Typography>
     
      <Typography variant="subtitle1" className='coinDescription'>
      {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
      </Typography>
       
      
      <div className="marketData">
        <span style={{display: "flex"}}>
          <Typography variant='h5' className='coinHeading'>
            Rank:
          </Typography>
          &nbsp; &nbsp;
          <Typography variant='h6' style={{fontFamily: "Montserrat"}}>
          {coin?.market_cap_rank}
          </Typography>
        </span>
        <span style={{display: "flex"}}>
          <Typography variant='h5' className='coinHeading'>
            Current Price:
          </Typography>
          &nbsp; &nbsp;
          <Typography variant='h6' style={{fontFamily: "Montserrat",}}>
          {symbol}{" "}
          {numberWithCommas(
            coin?.market_data.current_price[currency.toLowerCase()]
          )}
          </Typography>
        </span>
        <span style={{display: "flex"}}>
          <Typography variant='h5' className='coinHeading'>
            Market Cap:{" "}
          </Typography>
          &nbsp; &nbsp;
          <Typography variant='h6' style={{fontFamily: "Montserrat",}}>
          {numberWithCommas(
            coin?.market_data.market_cap[currency.toLowerCase()]
            .toString()
            .slice(0, -6)
          )} &nbsp; M
          </Typography>
        </span>
      </div>


      </div>
      {/* chart */}
      
      <CoinInfo coin={coin} />
     </div>
    
    </>
  );
};

export default CoinPage;