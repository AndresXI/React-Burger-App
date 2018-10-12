import React, { Component } from 'react'; 
import Aux from '../../../hoc/Aux/Aux'; 
import Button from '../../UI/Button/Button'; 

class OrderSummary extends Component {
    // This could be a functional component does'nt have to be a class

    componentWillUpdate() {
        console.log('[OrderSummay willUPdsate]'); 
    }



    render() {

        const ingridientSummary = Object.keys(this.props.ingridient)
        .map(igKey => {
            return <li key={igKey}>
                    <span 
                    style={{textTransform: 'capitalize'}}>{igKey}</span>: 
                    {this.props.ingridient[igKey]} 
                   </li>
        }); 


        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingridientSummary}
                </ul>
                <p>Continue to Ckeckout?</p>
                <p><strong>Your total: ${this.props.price.toFixed(2)}</strong></p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        ); 
    }
} 

export default OrderSummary; 