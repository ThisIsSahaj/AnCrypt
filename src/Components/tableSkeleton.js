import { makeStyles } from '@material-ui/core'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const useStyles = makeStyles((theme) => ({
    tableSkeleton:{
       display: "flex",
       width:"100%",
       height:"100%",
       padding: "0.5rem",
    //    border: "1px solid grey",
       borderRadius: "5px",
       justifyContent:"center",
       alignItems:"center",
      },

      // container:{
      //   display: "flex",
      //   width:"65%",
      //   alignItems:"center",
      // },

      
      leftCol:{
        marginRight: "1rem",
        float:"left",
      },
      
      middleCol:{
        flex: "0.2",
        
      },
      rightCol:{
        flex: "0.8", 
        marginLeft:"1rem",
        
      }
}));

const TableSkeleton = ({cards}) => {

    const classes = useStyles();

  return (
    Array(cards)
    .fill(0)
    .map((_, i) => 
    <div className={classes.tableSkeleton} key={i}>
        
        {/* <div className={classes.container} > */}
        
        <div className={classes.leftCol}>
          
            <Skeleton circle={true} width={50} height={50} />
          
        </div>
        <div className={classes.middleCol}>
            <Skeleton height={20} />
        </div>
        <div className={classes.rightCol}>
            <Skeleton height={20}  />
        </div>
        {/* </div> */}
    </div>
    )
  );
};

export default TableSkeleton