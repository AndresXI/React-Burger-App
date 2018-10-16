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

      checkoutCancelled = () => {
         // goes back to the last page 
         this.props.history.goBack(); 
      }

      checkoutContinued = () => {
         this.props.history.replace('/checkout/contact-data'); 
      }

      render() {
         return (
            <div>
               <CheckoutSummary 
                  checkoutContinued={this.checkoutContinued}
                  checkoutCancelled={this.checkoutCancelled}
                  ingridient={this.state.ingridient}/>
            </div>
         )
      }
}

export default Checkout; 