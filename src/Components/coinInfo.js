import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import {  Line } from "react-chartjs-2";
import {CircularProgress, createTheme,makeStyles,ThemeProvider, } from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";

// import {CategoryScale, Chart, LinearScale, BarElement} from 'chart.js'; 
// Chart.register(CategoryScale, LinearScale, BarElement);
// ChartJS.register(

//     CategoryScale,
//     LinearScale
// );
const useStyles = makeStyles((theme) => ({
  container: {
    width: '75%',
    // backgroundColor:'red',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));
const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency,prices } = CryptoState();
  // const [flag,setflag] = useState(false);
  

 

  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency, prices));
    // setflag(true);
    setHistoricalData(data.prices);
    
  };

  console.log(coin);
  console.log("days",days);
  console.log("data", historicData);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
      {/* <div className={classes.container}> */}
        
        {!historicData  ? (
          <CircularProgress
            style={{ color: "orange" }}
            size={250}
            thickness={1}
          />
          
        ) : (
          <>
          {/* Chart */}
            <Line
            
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "orange",
                  },
                ],
              }}
              
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
             
            {/* buttons */}
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {console.log("active >>>",days)}
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  activeDay ={days}
                  onClick={() => {
                    
                    setDays(day.value);
                    // setflag(false);
                  
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
    
  );
};

export default CoinInfo;