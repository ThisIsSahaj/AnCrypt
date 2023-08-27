import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  selectbutton: {
    border: "1px solid orange",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
  
   

   
    "&:hover, &:focus": {
      backgroundColor: "orange",
      color: "black",
    },
    width: "20%",
      margin: 5,
  },

 
}));
const SelectButton = ({ children, onClick}) => {

 

  const classes = useStyles();

  return (
    
    <span className={classes.selectbutton}
    onClick={onClick}>  
{children}
    </span>
  
    );
};

export default SelectButton;