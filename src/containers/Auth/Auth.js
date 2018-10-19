import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 

import Input from '../../components/UI/Input/Input'; 
import Button from '../../components/UI/Button/Button'; 
import classes from './Auth.css'; 
import * as actions from '../../store/actions/index'; 

class Auth extends Component {

   // the auth class can use a local state 
   state = {
      controls: {
         email: {
            elementType: "input",
               elementConfig: {
               type: "email",
                  placeholder: "Mail Address"
            },
            value: "",
               validation: {
               required: true, 
               isEmail: true
            },
            valid: false,
               touched: false
          },
         password: {
            elementType: "input",
            elementConfig: {
               type: "password",
               placeholder: "Password"
            },
            value: "",
            validation: {
               required: true,
               minLength: 6
            },
            valid: false,
            touched: false
         } 
      }   
   }

   checkValidation(value, rules) {
      let isValid = true;

      if (rules.required) {
         isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
         isValid = value.length >= rules.minLength && isValid;
      }
      if (rules.maxLength) {
         isValid = value.length <= rules.maxLength && isValid;
      }

      return isValid;
   } 

   inputChangedHandler = (event, controlName) => {
      const updatedControls = {
         ...this.state.controls,
         [controlName]: {
            ...this.state.controls[controlName],
            value: event.target.value, 
            valid: this.checkValidation(event.target.value, this.state.controls[controlName].validation),
            touched: true
         }
      }; 
      this.setState({controls: updatedControls}); 
   }

   submitHandler = (event) => {
      // prevent loading of the page
      event.preventDefault(); 
      this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value)
   }

   render() {
                                                            
      const formElementsArray = [];
      for (let key in this.state.controls) {
         formElementsArray.push({
            id: key,
            config: this.state.controls[key]
         })
      }

      const form = formElementsArray.map(formElement => (
         <Input
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            elementType={formElement.config.elementType} 
            key={formElement.id}/>
      )); 

      return (
         <div className={classes.Auth}>
            <form onSubmit={this.submitHandler}>
               { form }
               <Button btnType="Success">Submit</Button>
            </form>
         </div>
      ); 
   }
}

//dispatching states and props
const mapDispatchToProps = dispatch => {
      return {
         onAuth: (email, password) => dispatch(actions.auth(email, password))   
      }
}

export default connect(null, mapDispatchToProps)(Auth); 