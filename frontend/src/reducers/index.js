import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import { authReducer } from './authReducer';
import { cartReducer } from './cartReducer';
import { productReducer } from './productReducer';
import { wishlistReducer } from './wishlistReducer';

export default combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  form: reduxForm,
});
