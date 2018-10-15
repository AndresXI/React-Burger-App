import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 




class Checkout extends Component {
      // dummy data 
      state = {
         ingridient: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1,
         }
      }

      render() {
         return (
            <div>
               <CheckoutSummary ingridient={this.state.ingridient}/>
            </div>
         )
      }
}

export default Checkout; 