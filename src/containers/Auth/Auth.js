import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { Redirect } from 'react-router-dom'; 

import Input from '../../components/UI/Input/Input'; 
import Button from '../../components/UI/Button/Button'; 
import classes from './Auth.css'; 
import * as actions from '../../store/actions/index'; 
import Spinner from '../../components/UI/Spinner/Spinner'; 
import { updateObject, checkValidation } from '../../shared/utility'; 

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
      },
      isSignup: true
   }

   componentDidMount() {
      // reset the page if the user is not building a burger
      if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath(); 
      }
   }

   inputChangedHandler = (event, controlName) => {
      const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                  value: event.target.value,
                  valid: checkValidation(event.target.value, this.state.controls[controlName].validation),
                  touched: true 
            })
      });  
      this.setState({controls: updatedControls}); 
   }

   submitHandler = (event) => {
      // prevent loading of the page
      event.preventDefault(); 
      this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.controls.password.isSignup)
   }

   switchAuthModeHandler = () => {
      this.setState(prevState => {
            return {
                  isSignup: !prevState.isSignup
            }
      });       
   }

   render() {
                                                            
      const formElementsArray = [];
      for (let key in this.state.controls) {
         formElementsArray.push({
            id: key,
            config: this.state.controls[key]
         })
      }
      
      // load the form 
      let form = formElementsArray.map(formElement => (
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

      // load the spinner if not loading the form
      if (this.props.loading) {
            form = <Spinner />
      }

      let errorMessage = null; 
      if (this.props.error) {
            errorMessage = (
                  <p>{this.props.error.message}</p>
            );  
      }

      let authRedirect = null; 
      if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
      }

      return (
         <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={this.submitHandler}>
               { form }
               <Button btnType="Success">Submit</Button>
            </form>
            <Button 
                  clicked={this.switchAuthModeHandler}
                  btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
            </Button>
         </div>
      ); 
   }
}

//dispatching states and props
const mapDispatchToProps = dispatch => {
      return {
         onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
         onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
      }
}

const mapStateToProps = state => {
      return {
            loading: state.auth.loading,
            error: state.auth.error,
            isAuthenticated: state.auth.token !== null,
            buildingBurger: state.burgerBuilder.building,
            authRedirectPath: state.auth.authRedirectPath
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth); 