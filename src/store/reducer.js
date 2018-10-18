import * as actionTypes from './action'; 

const initialState = {
   ingridient: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
   },
   totalPrice: 0
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

      default:     
         return state; 
   }
}; 

export default reducer; 