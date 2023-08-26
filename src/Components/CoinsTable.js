import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead,  TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
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


   }));

const CoinsTable = () => {
//  const [coins, setCoins] = useState([]);
//  const [loading, setLoading] = useState(false);
 const [search, setSearch] = useState("");
 const [page, setPage] = useState(1)
 const navigate = useNavigate();

 const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

  // const fetchCoins = async () => {
  //   setLoading(true);
  //   const { data } = await axios.get(CoinList(currency));
    
  //   setCoins(data);
  //   setLoading(false);
  // };

console.log(coins);
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

  
   const classes = useStyles();     //IMP- do not use parenthesis () after useStyles i.e useStyles()
  

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
       
        style={{marginBottom: 80, marginTop:40, width: "20%", 
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
                <TableHead style={{backgroundColor: "orange"}}>
                   <TableRow>
                    {["Rank","Coin", "Price", "24h Change", "Market Cap"].map((head)=>(   //array with mapping
                        <TableCell style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
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
                        className='{classes.row} coinRow'
                        key={row.name}
                        > 
                          {/* Rank  */}
                          <TableCell>
                          <span style={{color: "white" , fontWeight:"100", }}>{row?.market_cap_rank}</span>
                          </TableCell>

                          {/* Coin */}
                        <TableCell component='th' scope='row'
                        style={{
                            display: "flex",
                            gap: 15,
                            fontWeight: 500,
                            alignItems:'center',
                            margin: "0px 2px",
                            
                        }}
                        >
                          
                          <img src={row?.image} alt={row.name} height="50" 
                          style={{marginBottom: 10}} />
                        
                        <div
                        style={{display: "flex", flexDirection: "row", alignItems:"center"}}
                        >
                          <span style={{fontSize: 22, fontWeight:"500"}}>{row.name}</span>
                          <span style={{color:"#737373", margin:"0px 8px"}}>•</span>
                         <span
                         style={{
                          textTransform: "uppercase",
                          color: "#737373",
                          fontSize: 16,
                          // marginLeft:12,
                          
                         }}
                         >
                          {row.symbol}
                         </span>
                        </div>
                        
                        </TableCell>
                        
                        {/* Price */}
                        <TableCell
                        align="right"
                        style={{fontWeight: 700,
                        fontSize: 16,}}>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}

                        </TableCell>
                           
                           {/* 24h Change */}
                          <TableCell 
                          align="right"
                          style={{
                            // color: profit > 0 ? "RGB(73, 251, 53)" : "rgb( 253, 28, 3)",
                            color: profit > 0 ? "#6ccf59" : "#ff4d4d",
                            fontWeight: 700, fontSize:16,
                          }}
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

                            float: "right",
                          }}>

                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                            </div>
                          </TableCell>

                          {/* Market Cap */}
                          <TableCell align="right"
                          style={{fontWeight: 700,
                            fontSize: 16,}}>
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            &nbsp; M
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