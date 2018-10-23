import React, { Component } from 'react'; 
import Button from '../../../components/UI/Button/Button'; 
import classes from './ContactData.css'; 
import axios from "../../../axios-orders"; 
import Spinner from '../../../components/UI/Spinner/Spinner'; 
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler"; 
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidation } from '../../../shared/utility'; 


class ContactData extends Component {
  // fetching data
  state = {
    orderForm: {
      
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
           required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
         validation: {
            required: true
         },
         valid: false,
         touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "zip code"
        },
        value: "",
         validation: {
            required: true,
            minLength: 5,
            maxLength: 5,
         },
         valid: false,
         touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
         validation: {
            required: true
         },
         valid: false,
         touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail"
        },
        value: "",
         validation: {
            required: true
         },
         valid: false,
         touched: false
      },
      deliveryMethod: {
         elementType: 'select',
         elementConfig: {
            options: [
               {value: 'fastest', displayValue: 'Fastest'},
               {value: 'cheapest', displayValue: 'Cheapest'}
            ]
         },
         value: 'fastest',
         validation: {},
         valid: true
      }
    },
    formIsValid: false
  };

  // submitting our data
  orderHandler = event => {
    event.preventDefault(); // prevents reloading
    const formData = {}; 
    for (let formElementIdentifier in this.state.orderForm) {
       // key value pairs 
       formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value; 
    }
    const order = {
      // order we want to store on the backend          
      ingrideints: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }
    this.props.onOrderBurger(order, this.props.token); 
  } 

  inputChangedHandler = (event, inputIdentifier) => {
      const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],  {
        value: event.target.value,
        valid: checkValidation(event.target.value, this.state.orderForm[inputIdentifier].validation),
         touched: true
      });
      const updatedOrderForm = updateObject(this.state.orderForm, {
        [inputIdentifier]: updatedFormElement
      }); 
    
      let formIsValid = true; 
      for (let inputIdentifier in updatedOrderForm) {
         formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid; 
      }
      
      this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid}); 

  }

  render() {
     const formElementsArray = []; 
     for (let key in this.state.orderForm) {
        formElementsArray.push({
           id: key, 
           config: this.state.orderForm[key]
        })
     }
    let form = (
      <form onSubmit={this.orderHandler}>
         {formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
               changed={(event) => this.inputChangedHandler(event, formElement.id)}
               elementConfig={formElement.config.elementConfig}
               value={formElement.config.value}
               invalid={!formElement.config.valid}
               touched={formElement.config.touched}
               shouldValidate={formElement.config.validation}
               elementType={formElement.config.elementType}/>
         ))}

        <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
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


const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingridient,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    userId: state.auth.userId,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios)); 