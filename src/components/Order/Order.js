import React from 'react';
import classes from './Order.css';


const order = (props) => {

   // transform ingredients object into an array 
   const ingridient = []; 
   for (let ingridientName in props.ingridients) { // loop through each property 
      ingridient.push(
         {  // push the property and amount in the array as an oject
            name: ingridientName, 
            amount: props.ingridients[ingridientName]
         }
      ); 
   }

   const ingridientOutput = ingridient.map(ig => {
      return <span 
         style={{
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px', 
            textTransform: 'capitalize'}}
         key={ig.name}>{ig.name} ({ig.amount})</span>
   })

   return (
      <div className={classes.Order}>
         <p>Ingridients: {ingridientOutput}</p>
         <p>Price: <strong>$ {Number.parseFloat(props.price).toFixed(2)}</strong></p>
      </div>
   );
}; 

export default order;