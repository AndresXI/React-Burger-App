import React from 'react';
import classes from './Button.css';  

const button = (props) => (
    <button 
        disabled={props.disabled} 
        className={[classes.Button, classes[props.btnType]].join(" ")}
        // orops.childer display whats inside the button when used 
        onClick={props.clicked}>{props.children}</button>
)

export default button; 