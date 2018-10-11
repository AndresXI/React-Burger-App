import React, { Component } from 'react'; 
import Aux from '../../hoc/Aux'; 
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls'; 


/* This component will contain our state for our burger */
class BurgerBuilder extends Component {

    /** Buger state of ingridients */
    state = {
        ingridient: {
            salad:  0, 
            bacon: 0,
            cheese: 0,
            meat: 0,
        }
    }

    render() {
        return (
            <Aux>
                <Burger ingridients={this.state.ingridient}/>
                <BuildControls />
            </Aux>
        ); 
    }
}

export default BurgerBuilder; 