import React, { Component } from 'react'; 
import Aux from '../../hoc/Aux/Aux'; 
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'; 
import OrderSummary from '../../components/Burger/OderSummary/OrderSummary'; 
import Spinner from '../../components/UI/Spinner/Spinner'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'; 
import { connect } from 'react-redux'; 
import * as actionType from '../../store/actions/index'; 
import axios from "../../axios-orders"; 




/* This component will contain our state for our burger */
class BurgerBuilder extends Component {

    /** Buger state of ingridients */
    state = {
        purchasable: false,
        purchasing: false,

    }

    // fetching data from the backend 
    componentDidMount() {
        console.log(this.props); 
        // getting our ingridents 
        this.props.onFetchIngridients(); 
    }

    updatePurchaseState(ingridients) {
        const sum = Object.keys(ingridients) // create array of our ingridients object
            .map(igKey => { // map it 
                return ingridients[igKey] // return the value for each key 
            })
            .reduce((sum, el) => {
                return sum + el; 
            }, 0); 
        return sum > 0 // purchase is true if the total sum is > 0   
    }

    purchaseHandler = () => {
        this.setState({purchasing: true}); 
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false}); 
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase(); 
        this.props.history.push('/checkout'); 
    }

    render() {
        // copy our ingredients on an immutable way 
        const disabledInfo = {
            ...this.props.ings // {salad: true, meat: false ....}
        }; 

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; 
        }
        let orderSummary = null; 
        console.log(this.props.error);
        let burger = this.props.error ? <p>Ingridients cannot be loaded</p> : <Spinner />; 
        if (this.props.ings) {
            // override burger if ingridients is not null 
              burger = (
                <Aux>
                    <Burger ingridients={this.props.ings}/>
                    <BuildControls 
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        disabled={disabledInfo}
                        ingridientRemoved={this.props.onIngridientRemoved}
                        ingridientAdded={this.props.onIngridientAdded} />
                </Aux>
            ); 
            // override order summary 
            orderSummary = <OrderSummary
                price={this.props.price}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                ingridient={this.props.ings} />; 
        }

        return (
            <Aux>
                <Modal 
                    modalClosed={this.purchaseCancelHandler}
                    show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        ); 
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingridient,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }; 
}

const mapDispatchToProps = dispatch => {
    return {
        onIngridientAdded: (ingName) => dispatch(actionType.addIngridient(ingName)),
        onIngridientRemoved: (ingName) => dispatch(actionType.removeIngridient(ingName)),
        onFetchIngridients: () => dispatch(actionType.fetchIngridients()), 
        onInitPurchase: () => dispatch(actionType.purchaseInit())
    }
}



// order does matter when exporting 
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios)); 