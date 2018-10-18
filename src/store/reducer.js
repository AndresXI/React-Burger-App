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

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.ADD_INGRIDIENT: 
         return {
            ...state, 
            ingridient: {
               ...state.ingridient,
               [action.ingridientName]: state.ingridient[action.ingridientName] + 1 
            }
         }; 

      case actionTypes.REMOVE_INGRIDIENT: 
         return {
            ...state,
            ingridient: {
               ...state.ingridient,
               [action.ingridientName]: state.ingridient[action.ingridientName] - 1
            }
         }; 

      default:     
         return state; 
   }
}; 

export default reducer; 