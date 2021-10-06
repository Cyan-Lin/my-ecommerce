import { FETCH_ORDERS } from '../actions/types';

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      const newObject = {};
      action.payload.forEach(order => {
        newObject[order._id] = order;
      });

      return { ...state, ...newObject };
    default:
      return state;
  }
};
