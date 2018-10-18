import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import { Route } from 'react-router-dom'; 
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
         return (
            <div>
               <CheckoutSummary 
                  checkoutContinued={this.checkoutContinued}
                  checkoutCancelled={this.checkoutCancelled}
                  ingridient={this.props.ings}/>
               <Route 
                  path={this.props.match.path + '/contact-data'} 
                  component={ContactData}/>
            </div>
         )
      }
}

// redux methods 
const mapStateToProps = state => {
      return {
            ings: state.ingridient
      }
};

export default connect(mapStateToProps) (Checkout); 