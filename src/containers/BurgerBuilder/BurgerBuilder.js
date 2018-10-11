import React, { Component } from 'react'; 
import Aux from '../../hoc/Aux'; 
import Burger from '../../components/Burger/Burger'; 


/* This component will contain our state for our burger */
class BurgerBuilder extends Component {

    /** Buger state of ingridients */
    state = {
        ingridient: {
            salad:  1, 
            bacon: 1,
            cheese: 2,
            meat: 2,
        }
    }

    render() {
        return (
            <Aux>
                <Burger ingridients={this.state.ingridient}/>
                <div>Build Controls</div>
            </Aux>
        ); 
    }
}

export default BurgerBuilder; 