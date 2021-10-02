import { FETCH_PRODUCTS, FETCH_PRODUCT } from '../actions/types';

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      const newObject = {};
      action.payload.forEach(product => {
        newObject[product._id] = product;
      });

      return { ...state, ...newObject };
    case FETCH_PRODUCT:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
