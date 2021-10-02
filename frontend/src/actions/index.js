import axios from 'axios';

import {
  FETCH_USER,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  EDIT_PRODUCT_IN_CART,
} from './types';

export const fetchUser = () => async dispatch => {
  const { data } = await axios.get('/auth/current_user');

  return dispatch({ type: FETCH_USER, payload: data });
};

export const fetchProducts = () => async dispatch => {
  const { data } = await axios.get('/api/products');

  return dispatch({ type: FETCH_PRODUCTS, payload: data });
};

export const fetchProduct = id => async dispatch => {
  const { data } = await axios.get(`/api/products/${id}`);

  return dispatch({ type: FETCH_PRODUCT, payload: data });
};

export const addProductToCart = (product, amount) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: { ...product, amount },
  };
};

export const removeProductFromCart = id => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: id,
  };
};

export const editProductInCart = (id, amount) => {
  return {
    type: EDIT_PRODUCT_IN_CART,
    payload: { id, amount },
  };
};
