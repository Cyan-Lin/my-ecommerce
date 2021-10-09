import { FETCH_ORDERS, PUSH_ORDER } from '../actions/types';

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      const newObject = {};
      action.payload.forEach(order => {
        newObject[order._id] = order;
      });

      return { ...state, ...newObject };
    case PUSH_ORDER:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
