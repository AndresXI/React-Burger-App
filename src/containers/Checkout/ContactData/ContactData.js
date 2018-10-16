import React, { Component } from 'react'; 
import Button from '../../../components/UI/Button/Button'; 
import classes from './ContactData.css'; 
import axios from "../../../axios-orders"; 
import Spinner from '../../../components/UI/Spinner/Spinner'; 



class ContactData extends Component {
   // fetching data 
   state = {
      name: '', 
      email: '',
      address: {
         street: '',
         postalCode: ''
      },
      loading: false
   }

   // submitting our data 
   orderHandler = (event) => {
         event.preventDefault(); // prevents reloading 
        this.setState({ loading: true }); 
        const order = { // order we want to store on the backend
            ingrideints: this.props.ingridients,
            price: this.props.price, 
            customer: { 
                name: 'andres', 
                address: {
                    street: 'my street adress', 
                    zipCode: '4353',
                    country: 'Germany'
                },
                email: 'test@yahoo.com'
            }, 
            deliveryMethod: 'fastest'
        }
       // send data to backend with axios
       axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false}); 
                this.props.history.push('/'); 
            })
            .catch(error => {
                this.setState({ loading: false}); 
            }); // endpoint
      //get access to ingredient and data 
      console.log(this.props.ingridients); 
   }

   render () {
      let form = (
         <form>
            <input className={classes.Input} type='text' name='name' placeholder='Your name' />
            <input className={classes.Input} type='email' name='email' placeholder='Your email' />
            <input className={classes.Input} type='text' name='street' placeholder='Street' />
            <input className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
         </form>
      ); 
      if (this.state.loading) {
         form = <Spinner />; 
      }

      return (
         <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
         </div>
      ); 
   }



} // end ContactData class

export default ContactData; 