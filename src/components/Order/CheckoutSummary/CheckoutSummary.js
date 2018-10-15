import React from 'react'; 
import Burger from '../../Burger/Burger'; 
import Button from '../../UI/Button/Button'; 
import classes from './CheckoutSummary.css'; 

const checkoutSummary = (props) => {
   // display a preview of our burger
   return (
      <div className={classes.CheckoutSummary}>
         <h1>We hope it tastes well!</h1>
         <div style={{width: '100%', height: '300px', margin: 'auto'}}>
            <Burger ingridients={props.ingridient}/>
         </div>
         <Button 
            clicked
            btnType="Danger">Cancel</Button>
         <Button 
            clicked
            btnType="Success">Continue</Button>
      </div>
   )
}

export default checkoutSummary; 