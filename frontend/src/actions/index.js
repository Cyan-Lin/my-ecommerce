import axios from 'axios';

import {
  FETCH_USER,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  EDIT_PRODUCT_IN_CART,
  ADD_PRODUCT_TO_WISHLIST,
  REMOVE_PRODUCT_FROM_WISHLIST,
  FETCH_ORDERS,
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

export const addProductToWishlist = product => {
  return {
    type: ADD_PRODUCT_TO_WISHLIST,
    payload: product,
  };
};

export const removeProductFromWishlist = id => {
  return {
    type: REMOVE_PRODUCT_FROM_WISHLIST,
    payload: id,
  };
};

export const submitOrder = (values, products, history) => async dispatch => {
  const orderedProducts = products.map(
    ({ _id, name, price, imageUrl, amount }) => ({
      _id,
      name,
      price,
      imageUrl,
      amount,
    })
  );

  const { data } = await axios.post('api/products', {
    values,
    orderedProducts,
  });
  history.push('/products');
  console.log(data);
  // dispatch({ type: FETCH_USER, payload: data });
};

export const fetchOrders = () => async dispatch => {
  const { data } = await axios.get('/api/orders');

  return dispatch({ type: FETCH_ORDERS, payload: data });
};
