import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead,  TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from "@material-ui/lab";



const CoinsTable = () => {
 const [coins, setCoins] = useState([]);
 const [loading, setLoading] = useState(false);
 const [search, setSearch] = useState("");
 const [page, setPage] = useState(1)
 const navigate = useNavigate();

 const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    
    setCoins(data);
    setLoading(false);
  };

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

   const useStyles = makeStyles(() => ({
  // row: {
  //   backgroundColor: "#16171a",
  //   cursor: "pointer",
  //   "&:hover":{
  //     backgroundColor: "#131111",
  //   },
  //   fontFamily: "Montserrat",
  // },

  pagination:{
    "& .MuiPaginationItem-root":{
      color: "aqua",
    },
  },


   }));
   const classes = useStyles;     //IMP- do not use parenthesis () after useStyles i.e useStyles()
  

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: "center"}}>
         <Typography 
         variant="h4"
         style={{margin: 18, fontFamily: "Montserrat"}}
         >
         LIVE🔴 Cryptocurrency Prices by Market Cap
         </Typography>
          
        <TextField label="Search For A Crypto Currency..." variant="outlined" 
        style={{marginBottom: 20, width: "100%", 
        boxShadow:" 20px 20px 50px rgba(0, 0, 0, 0.5)", backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderTop:"1px solid rgba(255, 255, 255, 0.5)", borderLeft:"1px solid rgba(255, 255, 255, 0.5)", backdropFilter:"blur(5px)",
        borderRadius: "6px",
      
      }}
        onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {
            loading?(
                <LinearProgress style={{backgroundColor: "aqua"}}/>
            ) : (

               <Table>
                <TableHead style={{backgroundColor: "#00ffff"}}>
                   <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head)=>(   //array with mapping
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

                          {/* Coin */}
                        <TableCell component='th' scope='row'
                        style={{
                            display: "flex",
                            gap: 15,
                        }}
                        >
                          <img src={row?.image} alt={row.name} height="50" 
                          style={{marginBottom: 10}} />
                        
                        <div
                        style={{display: "flex", flexDirection: "column"}}
                        >
                         <span
                         style={{
                          textTransform: "uppercase",
                          fontSize: 22,
                         }}
                         >
                          {row.symbol}
                         </span>
                         <span style={{color: "darkgrey"}}>{row.name}</span>
                        </div>
                        
                        </TableCell>
                        
                        {/* Price */}
                        <TableCell
                        align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}

                        </TableCell>
                           
                           {/* 24h Change */}
                          <TableCell 
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129" : "red",
                            fontWeight: 500,
                          }}
                          >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>

                          {/* Market Cap */}
                          <TableCell align="right">
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