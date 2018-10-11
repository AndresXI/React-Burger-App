import React, { Component } from 'react'; 
import Aux from '../../hoc/Aux'; 
// This component will contain our state for our burger 
class BurgerBuilder extends Component {
    render() {
        return (
            <Aux>
                <div>Burger</div>
                <div>Build Controls</div>
            </Aux>
        ); 
    }
}

export default BurgerBuilder; 