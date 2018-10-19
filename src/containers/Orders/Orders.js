import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 

import Order from '../../components/Order/Order';
import axios from '../../axios-orders'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'; 
import Spinner from '../../components/UI/Spinner/Spinner'




class Orders extends Component {

   // only fetch orders when it is loaded 
   componentDidMount() {
      this.props.onFetchOrders(); 
   }

   render () {
      // loading the spinner
      let orders = <Spinner />; 

      if (!this.props.loading) {
            orders = this.props.orders.map(order => (
              <Order
                ingridients={order.ingrideints}
                price={order.price}
                key={order.id}
              />
            ));
            
      }


      return (
         // map orders and return an rxjs object 
         <div>
            {orders}
         </div>
      ); 
   }
}

const mapDispatchToProps = dispatch => {
      return {
            onFetchOrders: () => dispatch(actions.fetchOrders())
      }; 
}

const mapStateToProps = state => {
      return {
           orders: state.order.orders,
           loading: state.order.loading
      }; 
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Orders, axios)); 