import { makeStyles } from '@material-ui/core';
import React from 'react'
import Skeleton from 'react-loading-skeleton'

const useStyles = makeStyles((theme) => ({
    container: {
    
        display: "flex",
        flexDirection:"row",
        border:"2px solid red",
        
    },
    box:{
        border:"2px solid green",
        margin:"0px 100px",
        width:"130px",
        height:"130px",
    },
    
    
}));
const CaraouselSkeleton = () => {
    const classes = useStyles();
  return (
    <div>
        <div className={classes.container}>
            <span className={classes.box}>
            <Skeleton  height="100%" width="100%" circle={true}/>
            <Skeleton />
            <Skeleton />
            
            </span>
            
        </div>

    </div>
  )
}

export default CaraouselSkeleton