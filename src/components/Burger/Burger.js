import React from 'react'; 
import classes from './Burger.css'; 
import BurgerIngridient from './BurgerIngridient/BurgerIngridient'; 


const burger = (props) => {

    /** returns an array of the objects property */
    // [meat, bacon, salad...] 
    let transformedIngridients = Object.keys(props.ingridients)
        .map(igKey => {
            // create a new array with all of the values for each ingridient 
            return [...Array(props.ingridients[igKey])].map((_, i) => {
                // creates a unique key for each ingridient, 
                // each type is contained in igKey
                return <BurgerIngridient key={igKey + i} type={igKey} />; 
            })
        }).reduce((arr, el) => {
            return arr.concat(el); // add all the elements to the array 
        }, []); 

        if (transformedIngridients.length === 0) {
            transformedIngridients = <p>Please Add Ingridients!</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngridient type="bread-top"/>
            {transformedIngridients}
            <BurgerIngridient type="bread-bottom"/>
        </div>
    ); 
}; 

export default burger; 