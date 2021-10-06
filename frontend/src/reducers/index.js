import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import { authReducer } from './authReducer';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { wishlistReducer } from './wishlistReducer';
import { orderReducer } from './orderReducer';

export default combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  orders: orderReducer,
  form: reduxForm,
});
