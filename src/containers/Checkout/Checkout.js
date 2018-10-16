import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import { Route } from 'react-router-dom'; 
import ContactData from './ContactData/ContactData';  


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

      componentDidMount() {
         const query = new URLSearchParams(this.props.location.search);
         const ingridients = {}; 
         for (let param of query.entries()) {
            // ['salad', '1']
            ingridients[param[0]] = +param[1]; 
         }
         this.setState({ingridient: ingridients}); 
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
               <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
         )
      }
}

export default Checkout; 