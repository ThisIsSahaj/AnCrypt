import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import Carousel from './Carousel';
import bgVideo1 from '../assets/bgVid1.mp4'
import bgVideo2 from '../assets/bgVid2.mp4'
import bgVideo3 from '../assets/bgVid3.mp4'
import bgVideo4 from '../assets/bgVid4.mp4'
import bgVideo5 from '../assets/bgVid5.mp4'
import Skeleton from 'react-loading-skeleton';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles((theme)=>({
  banner: {
     [theme.breakpoints.down("md")]: {
      height: 800,
    },
  
  },
  bannerContent:{
    height:600,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",    
  },

  tagline:{
    display:"flex",
    flexDirection:"column",
    justifyContent: "center",
    textAlign: "center", 
  }

}));
const Banner = () => {
  const {loading}= CryptoState();
  const classes = useStyles();

  return (<>
  
    <div className={classes.banner}>
      <div className="overlay"></div>
      <video src={bgVideo5} autoPlay loop muted  />
      <div className="heroText">
        <Container className={classes.bannerContent}>
     
      
            <div className={classes.tagline} >
                <Typography 
                
                variant="h2"
                style={{
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: 15,
                    fontFamily: "Montserrat",
                    
                }}
                >
                 Track Your Favorite Crypto
                </Typography>
                <Typography
                // variant="h5"
                style={{
                  color: "white",
                  textTransform: "capitalize",
                  fontFamily: "Montserrat",
                  fontWeight:"600",
                  // marginBottom:20,
                
                }}
                >
                  Get all the Live Info including Charts 
                </Typography>
            </div>
            
            <Carousel />
           
        </Container>
        </div>
    </div>
    </>
  );
};

export default Banner;