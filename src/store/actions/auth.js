import axios from 'axios'; 

import * as actionTypes from './actionTypes'; 


export const authStart = ()  => {
   return {
      type: actionTypes.AUTH_START
   }; 
}

export const authSuccess = (authData) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      authData: authData
   }
}

export const authFail = () => {
   return {
      type: actionTypes.AUTH_FAIL
   }
}

export const auth = (email, password) => {
   return dispatch => {
      // authenticate user 
      dispatch(authStart()); 
      const authData = {
         email: email, 
         password: password, 
         returnSecureToken: true
      }
      axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + 
         "AIzaSyCdAJwZ8pZOdnKHlkp_QeRVWzYPUB5g68I", authData)
         .then(res => {
            console.log(res); 
            dispatch(authSuccess(res.data));
         })
         .catch(err => {
            console.log(err); 
            dispatch(authFail()); 
         });
   }; 
}