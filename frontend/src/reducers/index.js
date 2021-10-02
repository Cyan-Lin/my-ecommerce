import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { cartReducer } from './cartReducer';
import { productReducer } from './productReducer';

export default combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
});
