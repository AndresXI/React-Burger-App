import React from 'react'; 
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'; 

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]; 

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                // execute the function ingridientAdded and pass in the type 
                added={() =>props.ingridientAdded(ctrl.type)} 
                removed={() => props.ingridientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} // accessing the boolean value of each type
                key={ctrl.label} 
                label={ctrl.label}/>
        ))}
        <button 
            onClick={props.ordered}
            disabled={!props.purchasable}
            className={classes.OrderButton}>ORDER NOW</button>
    </div>
); 

export default buildControls; 