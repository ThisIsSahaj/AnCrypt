import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead,  TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from "@material-ui/lab";
import {AiOutlineStar} from 'react-icons/ai'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { SingleCoin } from '../config/api';
import { async } from '@firebase/util';

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
  }

   }));

const CoinsTable = () => {
//  const [coins, setCoins] = useState([]);
//  const [loading, setLoading] = useState(false);
const { id } = useParams();
const [search, setSearch] = useState("");
 const [page, setPage] = useState(1)
 const navigate = useNavigate();
 const [coin, setCoin] = useState();
 const { currency, symbol, coins, loading, fetchCoins, user, watchlist, setAlert } = CryptoState();

//  const fetchCoin = async () => {
//   const { data } = await axios.get(SingleCoin(id));
//     setCoin(data);
// };
// useEffect(() => {
//   fetchCoin();
  
//  }, []);

 // Watchlist functionality
// const inWatchlist = watchlist.includes(coin?.id);

// const addToWatchlist= async() => {
//   const coinRef = doc(db, "watchlist", user.uid);
  
//   try {
//      await setDoc(coinRef,{
//             coins:watchlist?[...watchlist, coin?.id]:[coin?.id],
//           });  

//           setAlert({
//             open: true,
//             message: `${coin.name} Added to your Watchlist!`,
//             type: "success",
//           });
//   } catch (error) {
//      setAlert({
//       open: true,
//       message: error.message,
//       type: "error",
//      });
//   }
// };

//Remove from Watchlist function
// const removeFromWatchlist = async() => {
//   const coinRef = doc(db, "watchlist", user.uid);
  
//   try {
//      await setDoc(coinRef,{
//             coins: watchlist.filter((watch) => watch !== coin?.id)}, 
//             {merge: 'true'}
//           );  

//           setAlert({
//             open: true,
//             message: `${coin.name} Removed from your Watchlist!`,
//             type: "success",
//           });
//   } catch (error) {
//      setAlert({
//       open: true,
//       message: error.message,
//       type: "error",
//      });
//   };
// };


  useEffect(() => {
    fetchCoins();
  }, [currency]);
  
  const darkTheme= createTheme({
    palette: {
        primary:{
            main: "#fff",
        },
        type: "dark",
    },
  });

   const handleSearch = () => {
    return coins.filter(
        (coin) => (
        coin.name.toLowerCase().includes(search) || 
        coin.symbol.toLowerCase().includes(search)
    ));
   };





  
   const classes = useStyles();    
  

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: "center"}}>
         <Typography 
         variant="h4"
         style={{margin: 18, fontFamily: "Montserrat"}}
         >
         <span className='blinkText'>LIVE🔴  Cryptocurrency Prices by Market Cap </span>
         </Typography>
          
        <TextField label="Search" variant="outlined" 
       
        style={{marginBottom: 80, marginTop:40, width: "100%", 
        boxShadow:" 20px 20px 50px rgba(0, 0, 0, 0.5)", backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderTop:"1px solid rgba(255, 255, 255, 0.5)", borderLeft:"1px solid rgba(255, 255, 255, 0.5)", backdropFilter:"blur(5px)",
        borderRadius: "6px", 
      
      }}
        onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer 
        className='coinTable'>
          {
            loading?(
                <LinearProgress style={{backgroundColor: "orange"}}/>
            ) : (

               <Table>
                <TableHead style={{backgroundColor: "orange"}} className={classes.tableHead}>
                   <TableRow>
                    {["Rank", "Coin", "Price", "24h Change", "Market Cap"].map((head)=>(   //array with mapping
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
                 {handleSearch()
                 .slice((page-1)*10,(page-1)*10+10)
                 .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (<>
                        <TableRow 
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                        > 
                          {/* Rank  */}
                          <TableCell 
                          align="center"
                          className={classes.coinRank}>
                          <span >{row?.market_cap_rank}</span>
                          </TableCell>

                          {/* Watchlist*/}
                          {/* <TableCell 
                          align="center"
                          >
                          <span ><AiOutlineStar
                              style={{cursor: "pointer"}}
                              fontSize="22"
                              onClick={addToWatchlist}
                              
                              /></span>
                          </TableCell> */}


                          {/* Coin */}
                        <TableCell component='th' scope='row'
                        style={{
                            display: "flex",
                            gap: 15,
                            fontWeight: 500,
                            alignItems:'center',
                            
                            
                        }}
                        >
                          
                          <img src={row.image} alt={row.name} 
                          className={classes.coinImg}/>
                        
                        <div
                        style={{display: "flex", flexDirection: "row", alignItems:"center"}}
                        >
                          <span className={classes.coinName}>{row.name}</span>
                          <span style={{color:"#737373", margin:"0px 8px"}}>•</span>
                         <span className={classes.coinSymbol}>{row.symbol}</span>
                        </div>
                        
                        </TableCell>
                        
                        {/* Price */}
                        <TableCell
                        align="center"
                        className={classes.coinPrice}>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}

                        </TableCell>
                           
                           {/* 24h Change */}
                          <TableCell 
                          align="center"
                          style={{
                            // color: profit > 0 ? "RGB(73, 251, 53)" : "rgb( 253, 28, 3)",
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
                            // webkit-backdrop-filter: "blur(3.1px)",

                            float: "center",
                          }}>

                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                            </div>
                          </TableCell>

                          {/* Market Cap */}
                          <TableCell align="center"
                          className={classes.coinMarketCap}>
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
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
         <Pagination 
         style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
         }}
         classes={{ ul: classes.pagination }}
         count={(handleSearch()?.length/10).toFixed(0)}
         onChange={(_, value)=>{
          setPage(value);
          window.scroll(0, 450);
         }}
         
         />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable