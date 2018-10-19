import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import { Route, Redirect } from 'react-router-dom'; 
import ContactData from './ContactData/ContactData';  
import { connect } from 'react-redux';


class Checkout extends Component {
     
      checkoutCancelled = () => {
         // goes back to the last page 
         this.props.history.goBack(); 
      }

      checkoutContinued = () => {
         this.props.history.replace('/checkout/contact-data'); 
      }

      render() {
            // redirect to home page when there are not ingridients 
          let summary = <Redirect to="/" />; 

          // load page when igridients have been loaded 
          if (this.props.ings) {
            // redirect to home page if purchased is true 
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null; 
            summary = (
                 <div>
                        {purchasedRedirect}
                        <CheckoutSummary
                              checkoutContinued={this.checkoutContinued}
                              checkoutCancelled={this.checkoutCancelled}
                              ingridient={this.props.ings} />
                        <Route 
                              path={this.props.match.path + '/contact-data'}
                              component={ContactData} />  
                  </div>          
            )     
          }

         return  summary 
              
      }
}

// redux methods 
const mapStateToProps = state => {
      return {
            ings: state.burgerBuilder.ingridient, 
            purchased: state.order.purchased
      }
};


export default connect(mapStateToProps) (Checkout); 