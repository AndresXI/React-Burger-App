import * as actionTypes from './actionTypes'; 
import axios from "../../axios-orders"; 



export const addIngridient = (name) => {
   return {
      type: actionTypes.ADD_INGRIDIENT,
      ingridientName: name
   }; 
}; 

export const removeIngridient = (name) => {
   return {
      type: actionTypes.REMOVE_INGRIDIENT,
      ingridientName: name
   };
}; 

export const setIngridients = (ingridients) => {
   return {
     type: actionTypes.SET_INGRIDIENTS, 
     ingridients: ingridients
   }; 
}; 

export const fetchIngridientsFalied = () => {
   return {
      type: actionTypes.FETCH_INGRIDIENTS_FALIED
   }
}; 


export const fetchIngridients = () => {
   return dispatch => {
      // can excecute async code
      axios.get('https://react-burger-app-d3a03.firebaseio.com/ingridients.json')
         .then(response => {
            // set our state to the ingridients object in our backend 
            dispatch(setIngridients(response.data)); 
         })
         .catch(error => {
            dispatch(fetchIngridientsFalied()); 
         }); 
   }; 
}; 