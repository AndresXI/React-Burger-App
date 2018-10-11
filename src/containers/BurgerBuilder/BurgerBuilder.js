import React, { Component } from 'react'; 
import Aux from '../../hoc/Aux'; 
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls'; 

/** Seetting prices for each ingridient */
const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

/* This component will contain our state for our burger */
class BurgerBuilder extends Component {

    /** Buger state of ingridients */
    state = {
        ingridient: {
            salad:  0, 
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4 
    }

    /* add ingridients */
    addIngridientHandler = (type) => {
        /** get old ingridient count*/
        const oldCount = this.state.ingridient[type]; 
        const updatedCounted = oldCount + 1; 
        // create a new array of our old orray 
        const updatedIngridients = {
            ...this.state.ingridient
        }
        updatedIngridients[type] = updatedCounted; 
        // fetch the price 
        const priceAddition = INGRIDIENT_PRICES[type]; 
        const oldPrice = this.state.totalPrice; 
        const newPrice = oldPrice + priceAddition; 
        this.setState({totalPrice: newPrice, ingridient: updatedIngridients}); 
    }

    /** remove ingridients */
    removeIngridientHandler = (type) => {

    }

    render() {
        return (
            <Aux>
                <Burger ingridients={this.state.ingridient}/>
                <BuildControls ingridientAdded={this.addIngridientHandler} />
            </Aux>
        ); 
    }
}

export default BurgerBuilder; 