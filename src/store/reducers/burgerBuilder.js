import * as actionTypes from '../actions/actionTypes'; 

const initialState = {
   ingridient: null,
   totalPrice: 0,
   error: false
}; 

/** Seetting prices for each ingridient */
const INGRIDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7,
}

const reducer = (state = initialState, action) => {

   switch (action.type) {

      case actionTypes.ADD_INGRIDIENT: 
         return {
            ...state, 
            ingridient: {
               ...state.ingridient,
               [action.ingridientName]: state.ingridient[action.ingridientName] + 1 
            }, 
            totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName]
         }; 

      case actionTypes.REMOVE_INGRIDIENT: 
         return {
            ...state,
            ingridient: {
               ...state.ingridient,
               [action.ingridientName]: state.ingridient[action.ingridientName] - 1
            },
            totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingridientName]
         };
         
      case actionTypes.SET_INGRIDIENTS:
         return {
               ...state, 
               ingridient: action.ingridients,
               error: false, 
               totalPrice: 0
         }; 

      case actionTypes.FETCH_INGRIDIENTS_FALIED:
         return {
               ...state, 
               error: true
         }; 

      default:     
         return state; 
   }
}; 

export default reducer; 