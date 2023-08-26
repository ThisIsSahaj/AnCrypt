import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import Carousel from './Carousel';
import bgVideo1 from '../assets/bgVid1.mp4'
import bgVideo2 from '../assets/bgVid2.mp4'
import bgVideo3 from '../assets/bgVid3.mp4'
import bgVideo4 from '../assets/bgVid4.mp4'
import bgVideo5 from '../assets/bgVid5.mp4'

const useStyles = makeStyles(()=>({
  banner: {
    
    // backgroundImage: "url(./bgImgBLOR.jpg)",
    // backgroundImage: "url(./bgImg.webp)",
    // backgroundImage: "url(./bgImgNetwork.avif)",
    // backgroundImage: "url(./bgImgBlocks.jpg)",
    // backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
    
    
    
    
  },
  bannerContent:{
    height:800,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline:{
    display:"flex",
    height:"40%",
    flexDirection:"column",
    justifyContent: "center",
    textAlign: "center",
  }

}));
const Banner = () => {
  const classes = useStyles();
  return (<>
  
    <div className={classes.banner}>
      <div className="overlay"></div>
      {/* <video src={bgVideo1} autoPlay loop muted /> */}
      {/* <video src={bgVideo2} autoPlay loop muted /> */}
      {/* <video src={bgVideo3} autoPlay loop muted /> */}
      {/* <video src={bgVideo4} autoPlay loop muted /> */}
      <video src={bgVideo5} autoPlay loop muted />
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
                variant="h5"
                style={{
                  color: "white",
                  textTransform: "capitalize",
                  fontFamily: "Montserrat",
                  fontWeight:"600",
                
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