import React, { Component } from 'react'; 
import Aux from '../../hoc/Aux'; 
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import  Modal from '../../components/UI/Modal/Modal'; 
import OrderSummary from '../../components/Burger/OderSummary/OrderSummary'; 

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
        totalPrice: 0,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingridients) {
        const sum = Object.keys(ingridients) // create array of our ingridients object
            .map(igKey => { // map it 
                return ingridients[igKey] // return the value for each key 
            })
            .reduce((sum, el) => {
                return sum + el; 
            }, 0); 
        this.setState({purchasable: sum > 0}) // purchase is true if the total sum is > 0   
    }

    purchaseHandler = () => {
        this.setState({purchasing: true}); 
    }

    purcaseCancelHandler = () => {
        this.setState({purchasing: false}); 
    }

    purchaseContinueHandler = () => {
        alert("You continue!"); 
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
        this.updatePurchaseState(updatedIngridients); 
    }

    /** remove ingridients */
    removeIngridientHandler = (type) => {
         /** get old ingridient count*/
         const oldCount = this.state.ingridient[type];
         // make sure we return 0 when there are no ingridients 
         if (oldCount <= 0) {
            return 0; 
         }
         const updatedCounted = oldCount - 1;
         // create a new array of our old orray 
         const updatedIngridients = {
             ...this.state.ingridient
         }; 
         updatedIngridients[type] = updatedCounted;
         // fetch the price 
         const priceDeduction = INGRIDIENT_PRICES[type];
         const oldPrice = this.state.totalPrice;
         const newPrice = oldPrice - priceDeduction;
         this.setState({
             totalPrice: newPrice,
             ingridient: updatedIngridients
         });
         this.updatePurchaseState(updatedIngridients);
    }

    render() {
        // copy our ingrideints on an inmutible way 
        const disabledInfo = {
            ...this.state.ingridient // {salad: true, meat: flase ....}
        }; 

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; 
        }

        return (
            <Aux>
                <Modal 
                    modalClosed={this.purcaseCancelHandler}
                    show={this.state.purchasing}>
                    <OrderSummary 
                        price={this.state.totalPrice}
                        purchaseContinued={this.purchaseContinueHandler}
                        purchaseCancelled={this.purcaseCancelHandler}
                        ingridient={this.state.ingridient}/>
                </Modal>
                <Burger ingridients={this.state.ingridient}/>
                <BuildControls 
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    disabled={disabledInfo}
                    ingridientRemoved={this.removeIngridientHandler}
                    ingridientAdded={this.addIngridientHandler} />
            </Aux>
        ); 
    }
}

export default BurgerBuilder; 