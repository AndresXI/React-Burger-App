import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import { Route } from 'react-router-dom'; 
import ContactData from './ContactData/ContactData';  


class Checkout extends Component {
      // dummy data 
      state = {
         ingridient: null, 
         price: 0
      }

      componentWillMount() {
         const query = new URLSearchParams(this.props.location.search);
         const ingridients = {}; 
         let price = 0; 
         for (let param of query.entries()) {
            // ['salad', '1']
            if (param[0] === 'price') {
               price = param[1]; 
            } else {
               ingridients[param[0]] = +param[1]; 
            }
         }
         this.setState({ingridient: ingridients, totalPrice: price}); 
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
               <Route 
                  path={this.props.match.path + '/contact-data'} 
                  render={(props) => (<ContactData ingridients={this.state.ingridient} price={this.state.totalPrice} {...props} />)}/>
            </div>
         )
      }
}

export default Checkout; 