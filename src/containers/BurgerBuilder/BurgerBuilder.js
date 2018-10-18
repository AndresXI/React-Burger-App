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
        totalPrice: 0,
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
        this.setState({purchasable: sum > 0}) // purchase is true if the total sum is > 0   
    }

    purchaseHandler = () => {
        this.setState({purchasing: true}); 
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false}); 
    }

    purchaseContinueHandler = () => {
    const queryParams = []; 
    for (let i in this.state.ingridient) {
        // property name = property value 
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingridient[i])); 
    }
    queryParams.push('price=' + this.state.totalPrice); 
    const queryString = queryParams.join("&"); 
    this.props.history.push({
        pathname: '/checkout',
        search: '?' + queryString
    }); 
    }

    /* add ingridients */
    addIngridientHandler = (type) => {
        /** get old ingridient count*/
        const oldCount = this.state.ingridient[type]; 
        const updatedCounted = oldCount + 1; 
        // create a new array of our old array 
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
         // create a new array of our old array 
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
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                        ingridientRemoved={this.props.onIngridientRemoved}
                        ingridientAdded={this.props.onIngridientAdded} />
                </Aux>
            ); 
            // override order summary 
            orderSummary = <OrderSummary
                price={this.state.totalPrice}
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
        ings: state.ingridient
    }; 
}

const mapDispatchToProps = dispatch => {
    return {
        onIngridientAdded: (ingName) => dispatch({type: actionType.ADD_INGRIDIENT, ingridientName: ingName}),
        onIngridientRemoved: (ingName) => dispatch({type: actionType.REMOVE_INGRIDIENT, ingridientName: ingName}),
    }
}




export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios)); 