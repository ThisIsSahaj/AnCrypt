import { makeStyles } from '@material-ui/core'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const useStyles = makeStyles((theme) => ({
    container: {
    
        display: "flex",
        [theme.breakpoints.down("md")]:{
          flexDirection: "column",
          alignItems: "center"
      },
    },
    sidebar: {
      width: "30%",
     
      
      [theme.breakpoints.down("md")] : {
        width: "100%",
        
      },
      display: "flex", 
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
      padding: "20px",
      
    },
    button: {
     marginTop:"200%",
     marginLeft:"40px"
    

    },
   
    
    
}));

const CoinSkeleton = () => {

    const classes = useStyles();
  return (
    <div>
           <div className={classes.container}>
      <div className={classes.sidebar}>
        
       
      <Skeleton circle={true} width={200} height={200}/>


     
        <Skeleton height={50} width={200} style={{margin:20}}/>
      
     
      <Skeleton count={4}  height={10} width={350}  />
             
      
      <div className="marketData">
        <span >
          <Skeleton height={20} width={150} style={{margin:"10px 0px"}} />
        </span>
        <span >
          <Skeleton height={20} width={150} style={{margin:"10px 0px"}} />
        </span>
        <span >
          <Skeleton height={20} width={150} style={{margin:"10px 0px"}} />
        </span>    
        <span>
        <Skeleton height={40} width="100%" style={{margin:"20px 0px"}} />
        </span>
         
        
      </div>
      
      </div>
    <div style={{width:"1330px", justifyContent:"center"}}>
     <div style={{display:"flex", flexDirection:"row", alignItems:"flex-end", justifyContent:"center"}}>
     <Skeleton height={10} width={120}className={classes.button} />
     </div>
      <div style={{display:"flex", flexDirection:"row", alignItems:"flex-end", justifyContent:"center"}}>

      <Skeleton height={30} width={120} className={classes.button} />
      <Skeleton height={30} width={120} className={classes.button} />
      <Skeleton height={30} width={120} className={classes.button} />
      <Skeleton height={30} width={120} className={classes.button} />
      <Skeleton height={30} width={120} className={classes.button} />
      </div>
    
   
      
    </div>
     </div>
    </div>
  )
}

export default CoinSkeleton