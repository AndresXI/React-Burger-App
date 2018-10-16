import React, { Component } from 'react'; 
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {
   state = {
      orders: [], 
      loading: true
   }

   // only fetch orders when it is loaded 
   componentDidMount() {
      axios.get('/orders.json')
         .then(res => {
           // turn object into an array 
           const fetchedOrders = []; 
           for (let key in res.data) {
              fetchedOrders.push({...res.data[key], id:key}); 
           }
           // update orders 
            this.setState({loading: false, orders: fetchedOrders}); 
         })
         .catch(err => {
            this.setState({loading: false}); 
         })
   }

   render () {
      return (
         // map orders and return an rxjs object 
         <div>
            {this.state.orders.map(order => (
               <Order 
                  ingridients={order.ingrideints}
                  price={order.price}
                  key={order.id}></Order>
            ))}
         </div>
      ); 
   }
}

export default withErrorHandler(Orders, axios); 