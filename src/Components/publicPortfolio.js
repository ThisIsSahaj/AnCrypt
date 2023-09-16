import { onSnapshot, } from 'firebase/firestore';
import { Container,  createTheme,  LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead,  TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from "@material-ui/lab";
import { doc } from 'firebase/firestore';
import { db } from '../firebase';


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

const PublicPortfolio = () => {
  const { userId } = useParams();
  const [search, setSearch] = useState("");
 const [page, setPage] = useState(1)
 const navigate = useNavigate();
 
   const {coins, symbol, publicPortfolio, setPublicPortfolio, loading, watchlist, setWatchlist, fetchCoins, currency} = CryptoState();
   
  //  fetchCoins(); 
   

   
   
   useEffect(() => {
     
     const docRef = doc(db, "publicPortfolio", userId);
     
     // const fetchUserData = async () => {
       
       //  const docSnap = await getDoc(docRef);
       //  console.log(docSnap.data());
       //  setUserData(docSnap.data())
       
       var unsubscribe = onSnapshot(docRef, coin =>{
         if (coin.exists()){
           setPublicPortfolio(coin.data().coins);
           console.log(coin.data().coins);

  
  

   
   const docRef = doc(db, "publicPortfolio", userId);

   var unsubscribe = onSnapshot(docRef, coin =>{
    if (coin.exists()){
      setPublicPortfolio(coin.data().coins);

    } else{
      console.log("No items in Portfolio");
      
      
    }
  });
  
  
}, [userId]);


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
    <div>
     
        <div>          
           {/* Public Portfolio  */}
           <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: "center"}}>
         <Typography 
         variant="h4"
         style={{margin: 18, fontFamily: "Montserrat"}}
         >
         <span style={{fontSize:"30px"}} >You are viewing a</span>
         <br/>
         <span className='blinkText' style={{fontSize:"50px"}}>Public Portfolio </span>
         </Typography>
          
        


     
      




        {/* coin table */}
        <TableContainer 
        className='coinTable'>
          {
            loading?(
                <LinearProgress style={{backgroundColor: "orange"}}/>
            ) : (

               <Table>
                <TableHead style={{backgroundColor: "orange"}} className={classes.tableHead}>
                   <TableRow>
                    {["Coin","Rank", "Price", "24h Change", "Market Cap"].map((head)=>(   //array with mapping
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

                {publicPortfolio.map((coinId) => {
                   const coin = coins.find((c) => c.id === coinId);
                   if (coin) {
                    const profit = coin.price_change_percentage_24h > 0;

                //  {coins.map((coin) => {
                //   const profit = coin.price_change_percentage_24h > 0;

                 
                 {coins.map((coin) => {
                  const profit = coin.price_change_percentage_24h > 0;

                  
                        
                    
                   
                    // if (publicPortfolio.includes(coin.id))
                    return (<>
                      
                        <TableRow 
                        
                        className={classes.row}
                        key={coin.name}
                        > 

                       
                          
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
                    ) }
                 
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
           
          
        </div>
    
    </div>
  );
};
    
export default PublicPortfolio;
