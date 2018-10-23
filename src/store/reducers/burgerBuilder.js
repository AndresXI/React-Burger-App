import * as actionTypes from '../actions/actionTypes'; 
import { updateObject } from '../../shared/utility'; 



const initialState = {
   ingridient: null,
   totalPrice: 0,
   error: false,
   building: false
}; 

/** Seetting prices for each ingridient */
const INGRIDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7,
}

// helper functions 
const addIngridient = (state, action) => {
      const updatedIngridient = { [action.ingridientName]: state.ingridient[action.ingridientName] + 1 }
      const updatedIngridients = updateObject(state.ingridient, updatedIngridient);
      const updatedState = {
            ingridient: updatedIngridients,
            building: true,
            totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName]
      }
      return updateObject(state, updatedState); 
}; 

const removeIngridient = (state, action) => {
      const updatedIng = { [action.ingridientName]: state.ingridient[action.ingridientName] - 1 }
      const updatedIngs = updateObject(state.ingridient, updatedIng);
      const updatedSt = {
            ingridient: updatedIngs,
            building: true,
            totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName]
      }
      return updateObject(state, updatedSt)
}

const setIngridients = (state, action) => {
      return updateObject(state, {
        ...state,
        ingridient: action.ingridients,
        error: false,
        building: false,
        totalPrice: 0
      });
}

const fetchIngridientsFail = (state, action) => {
      return updateObject(state, { error: true }); 
}

/** Switch case for actions  */
const reducer = (state = initialState, action) => {

   switch (action.type) {

      case actionTypes.ADD_INGRIDIENT: 
         return addIngridient(state, action);

      case actionTypes.REMOVE_INGRIDIENT: 
         return removeIngridient(state, action);
         
      case actionTypes.SET_INGRIDIENTS:
         return setIngridients(state, action); 

      case actionTypes.FETCH_INGRIDIENTS_FALIED:
         return fetchIngridientsFail(state, action); 

      default:     
         return state; 
   }
}; 

export default reducer; 