import React, { Component } from 'react'; 
import classes from './BurgerIngridient.css'; 
import PropTypes from 'prop-types'; 

class BurgerIngridient extends Component {

    render() {

        /** Holds the ingridients. */
        let ingridient = null; 

        switch (this.props.type) {
            case ('bread-bottom'):
                ingridient = <div className={classes.BreadBottom}></div>; 
                break;
        
            case ('bread-top'):
                ingridient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div> 
                        <div className={classes.Seeds2}></div> 
                    </div>
                ); 
                break;

            case ('meat'): 
                ingridient = <div className={classes.Meat}></div>; 
                break; 

            case ('cheese'): 
                ingridient = <div className={classes.Cheese}></div>
                break; 
            case ('bacon'): 
                ingridient = <div className={classes.Bacon}></div>
                break; 
            case ('salad'): 
                ingridient = <div className={classes.Salad}></div>
                break;    
            default: 
                ingridient = null; 
        }

        return ingridient; 

        }

    }

    /** Adding prop type validation. */
    BurgerIngridient.propType = {
        type: PropTypes.string.isRequired
    }; 

export default BurgerIngridient; 