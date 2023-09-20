import { Button, Container, createTheme, IconButton, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead,  TableRow, TextField, ThemeProvider, Typography, Tooltip } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from "@material-ui/lab";
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import {MdOutlineContentCopy} from 'react-icons/md'
import TableSkeleton from './tableSkeleton';


const useStyles = makeStyles((theme) => ({

  tableHead:{
    [theme.breakpoints.down("md")]: {
      display:"none",
    },
  },
  row: {
    cursor: "pointer",
    "&:hover":{
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },

  pagination:{
    "& .MuiPaginationItem-root":{
      color: "orange",
    },
  },
  coinName:{
    fontSize: 22, fontWeight:500,
    [theme.breakpoints.down("md")]: {
      fontSize:14,
    },
  },
  coinSymbol:{
    textTransform: "uppercase",
    color: "#737373",
    fontSize: 16,
    marginTop:5,
    [theme.breakpoints.down("md")]: {
      fontSize:12,
    },
  },
  coinImg:{
    marginBottom: 20,
    marginTop:20,
    height: 50,
    [theme.breakpoints.down("md")]: {
      height: 40,
      marginBottom: 30,
      marginTop:20,
    },
  },
  coinRank:{
    fontWeight: 100,
    [theme.breakpoints.down("md")]: {
      display:"none",
    },
    
  },
  coinPrice:{
    fontWeight: 700,
    fontSize: 16,
    [theme.breakpoints.down("md")]: {
      fontWeight: 500,
      fontSize: 12,
      
    },
  },
  
  coinMarketCap:{
    fontWeight: 700,
    fontSize: 16,
    [theme.breakpoints.down("md")]: {
      display:"none",
    },
  },
  link:{
    fontSize:"16px",
    [theme.breakpoints.down("md")]: {
    fontSize:"16px",
    },
  },

   }));

const Portfolio = () => {
//  const [coins, setCoins] = useState([]);
//  const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
 
 const { currency, symbol, coins, loading, fetchCoins, user, watchlist, setAlert,publicPortfolio,setPublicPortfolio } = CryptoState();
 const sharingLink = `https://ancrypt.onrender.com/#/publicPortfolio/${user.uid}`
 const [isCopied, setIsCopied] = useState(false);
 setPublicPortfolio(watchlist); 

 const copyToClipboard = () => {
  const input = document.createElement('input');
  input.value = sharingLink;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  setIsCopied(true);

    setAlert({
      open: true,
      message: "Copied to clipboard!",
      type: "success",
    });
  
};
  
  useEffect(() => {
    setTimeout(() => {
      fetchCoins();
  
    }, 2000)
    
   }, [currency]);

  const darkTheme= createTheme({
    palette: {
        primary:{
            main: "#fff",
        },
        type: "dark",
    },
  });

   
   const classes = useStyles();    
  
  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: "center"}}>
         <Typography 
         variant="h4"
         style={{margin: 18, fontFamily: "Montserrat"}}
         >
         <span className='blinkText'>Your Watchlist</span>
         </Typography>
          
        

        {/* coin table */}
        <TableContainer 
        className='coinTable'>
          {
            loading?(
                // <LinearProgress style={{backgroundColor: "orange"}}/>
                <TableSkeleton cards={5}/>    
            ) : (

               <Table>
                <TableHead style={{backgroundColor: "orange"}} className={classes.tableHead}>
                   <TableRow>
                    {["", "Coin","Rank", "Price", "24h Change", "Market Cap"].map((head)=>(   //array with mapping
                        <TableCell style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "center"}
                        >
                            {head}
                        </TableCell>
                    ))}
                   </TableRow>
                </TableHead>
                 
                <TableBody>
                 
                 {coins.map((coin) => {
                  const profit = coin.price_change_percentage_24h > 0;
                    const inWatchlist = watchlist.includes(coin?.id);
                  
                        
                    // Remove from Watchlist function
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
                   
                    if (watchlist.includes(coin.id))
                    return (<>
                      
                        <TableRow 
                        className={classes.row}
                        key={coin.name}
                        > 

                          {/* Watchlist  */}
                          <TableCell>
                            {/* AddToWatchList star or Login page */}
                           {inWatchlist ? <AiFillStar onClick={removeFromWatchlist} style={{cursor: "pointer" , color:"orange"}} fontSize="22"/> : <AiOutlineStar style={{cursor: "pointer"}} fontSize="22"/>  }
                            
                         
                          </TableCell>


                          {/* Coin */}
                        <TableCell component='th' scope='row'
                        onClick={() => navigate(`/coins/${coin.id}`)}
                        style={{
                            display: "flex",
                            gap: 15,
                            fontWeight: 500,
                            alignItems:'center',
                        }}
                        >
                          
                          <img src={coin.image} alt={coin.name} 
                          className={classes.coinImg}/>
                        
                        <div
                        style={{display: "flex", flexDirection: "row", alignItems:"center"}}
                        >
                          <span className={classes.coinName}>{coin.name}</span>
                          <span style={{color:"#737373", margin:"0px 8px"}}>•</span>
                         <span className={classes.coinSymbol}>{coin.symbol}</span>
                        </div>
                        
                        </TableCell>

                        {/* Rank  */}
                        <TableCell 
                          onClick={() => navigate(`/coins/${coin.id}`)}
                          align="center"
                          className={classes.coinRank}>
                          <span >{coin?.market_cap_rank}</span>
                          </TableCell>
                        
                        {/* Price */}
                        <TableCell
                        onClick={() => navigate(`/coins/${coin.id}`)}
                        align="center"
                        className={classes.coinPrice}>
                          {symbol}{" "}
                          {numberWithCommas(coin.current_price.toFixed(2))}

                        </TableCell>
                           
                           {/* 24h Change */}
                          <TableCell 
                          onClick={() => navigate(`/coins/${coin.id}`)}
                          align="center"
                          style={{
                            
                            color: profit > 0 ? "#6ccf59" : "#ff4d4d",
                            
                          }}
                          className={classes.coinPrice}
                          >
                          <div style={{border: profit > 0 ? "1px solid rgba(28, 119, 0, 0.02)" : "rgba(119, 7, 0, 0.02)",
                            width:"70px",
                            height:"30px",    
                            textAlign:"center",
                            padding:"2px",
                            borderRadius:"6px",
                            
                            background: profit > 0 ? "rgba(8,209,88,0.1)" : "rgba(255, 68, 68, 0.1)",
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                            backdropFilter: "blur(3.1px)",
                            // float: "center",
                          }}>

                          {profit && "+"}
                          {coin.price_change_percentage_24h.toFixed(2)}%
                            </div>
                          </TableCell>

                          {/* Market Cap */}
                          <TableCell align="center"
                          onClick={() => navigate(`/coins/${coin.id}`)}
                          className={classes.coinMarketCap}>
                            {symbol}{" "}
                            {numberWithCommas(
                              coin.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                            </>
                    ) 
                 
                })}
                </TableBody>
               </Table>
            )
          }
            
        </TableContainer>
      
        

        <div style={{width:"100%", overflowWrap:"break-word", margin:"20px 0px"}}>
        <span className={classes.link}>Copy your watchlist's link to share it-  
      <Link to={`/publicPortfolio/${user.uid}`}> {sharingLink} </Link>   
      </span>
      <div className="tooltip">
         <MdOutlineContentCopy onClick={copyToClipboard} cursor={"pointer"} title="Copy"/>
         <span className="tooltiptext">Copy</span>
        </div>
        </div>

     
        </Container>
    </ThemeProvider>
  )
}

export default Portfolio
