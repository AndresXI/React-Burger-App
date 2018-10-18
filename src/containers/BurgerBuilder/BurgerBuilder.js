import React, { Component } from 'react'; 
import Aux from '../../hoc/Aux/Aux'; 
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'; 
import OrderSummary from '../../components/Burger/OderSummary/OrderSummary'; 
import axios from '../../axios-orders'; 
import Spinner from '../../components/UI/Spinner/Spinner'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'; 
import { connect } from 'react-redux'; 
import * as actionType from '../../store/action'; 


/* This component will contain our state for our burger */
class BurgerBuilder extends Component {

    /** Buger state of ingridients */
    state = {
        purchasable: false,
        purchasing: false,
        loading: false, 
        error: false
    }

    // fetching data from the backend 
    componentDidMount() {
        console.log(this.props); 
        // getting our ingridents 
        // axios.get('https://react-burger-app-d3a03.firebaseio.com/ingridients.json')
        //     .then(response => {
        //         // set our state to the ingridients object in our backend 
        //         this.setState({ingridient: response.data}); 
        //     })
        //     .catch(error => {
        //         this.setState({error: true}); 
        //     }); 
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

        let burger = this.state.error ? <p>Ingridients cannot be loaded</p> : <Spinner />; 
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

        // showing the loader spinner 
        if (this.state.loading) {
            orderSummary = <Spinner /> ;
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
        ings: state.ingridient,
        price: state.totalPrice
    }; 
}

const mapDispatchToProps = dispatch => {
    return {
        onIngridientAdded: (ingName) => dispatch({type: actionType.ADD_INGRIDIENT, ingridientName: ingName}),
        onIngridientRemoved: (ingName) => dispatch({type: actionType.REMOVE_INGRIDIENT, ingridientName: ingName}),
    }
}



// order does matter when exporting 
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios)); 