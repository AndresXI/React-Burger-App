import React, { Component } from 'react'; 
import Modal from '../../components/UI/Modal/Modal'; 
import Aux from '../Aux/Aux'; 

const withErrorHandler = (WrappedComponent, axios) => {
   return class extends Component {

      state = {
         error: null
      }

      componentWillMount() {
         // add a new interceptor for a request 
         this.reqInterceptor = axios.interceptors.request.use(req => {
            // clear any errors 
            this.setState({error: null}); 
            return req; 
         })

         // set up a global interceptor 
         this.resInterceptor = axios.interceptors.response.use(res => res, error => {
            // show error modal 
            this.setState({error: error}); 
         }); 
      } // end componentWilMount 

      componentWillUnmount() {
         // remove interceptors 
         axios.interceptors.request.eject(this.reqInterceptor); 
         axios.interceptors.request.eject(this.resInterceptor); 
      }

      errorConfirmedHandler = () => {
         this.setState({error: null}); 
      }

      render () {
         return (
             <Aux>  
               <Modal 
                  modalClosed={this.errorConfirmedHandler}
                  show={this.state.error}>
                     {this.state.error ? this.state.error.message : null}
               </Modal>
               <WrappedComponent {...this.props} />
            </Aux>
         ); 
      }
   } 
}

export default withErrorHandler; 