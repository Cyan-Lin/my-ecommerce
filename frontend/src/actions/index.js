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
  LOAD_LOCAL_STORAGE,
  PUSH_ORDER,
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

export const loadLocalStorage = () => {
  // 這裡發生一個錯誤,結果是因為原本不小心在localstorage裡面存了wishliist(裡面已經是Object),我又用JSON.parse(),才會報錯,後來在console用localStorage.clear清除後就好了
  const localCart = JSON.parse(localStorage.getItem('cart')) || {};
  const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || {};

  return {
    type: LOAD_LOCAL_STORAGE,
    payload: { localCart, localWishlist },
  };
};

export const addProductToCart =
  (product, amount) => async (dispatch, getState) => {
    const localCart = JSON.parse(localStorage.getItem('cart')) || {};
    const newCartProduct = { ...product, amount };
    // const cart = getState().cart;

    const { [newCartProduct._id]: foundCartProduct } = localCart;
    // 如果在原cart中找到有相同商品(foundCartProduct)時,把新進來的(cartProduct)amount加上原有商品的amount
    if (foundCartProduct) newCartProduct.amount += foundCartProduct.amount;
    const newCart = { ...localCart, [newCartProduct._id]: newCartProduct };

    localStorage.setItem('cart', JSON.stringify(newCart));

    dispatch({
      type: ADD_PRODUCT_TO_CART,
      payload: newCart,
    });
  };

export const removeProductFromCart = id => {
  const localCart = JSON.parse(localStorage.getItem('cart')) || {};

  const { [id]: removedProduct, ...otherCartProducts } = localCart;
  localStorage.setItem('cart', JSON.stringify(otherCartProducts));

  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: otherCartProducts,
  };
};

export const editProductInCart = (id, amount) => {
  const localCart = JSON.parse(localStorage.getItem('cart')) || {};

  const editedCartProduct = localCart[id];
  editedCartProduct.amount = amount;

  const newCart = { ...localCart, [editedCartProduct._id]: editedCartProduct };
  localStorage.setItem('cart', JSON.stringify(newCart));

  return {
    type: EDIT_PRODUCT_IN_CART,
    payload: newCart,
  };
};

export const addProductToWishlist = product => {
  const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || {};

  const newWishlist = { ...localWishlist, [product._id]: product };
  localStorage.setItem('wishlist', JSON.stringify(newWishlist));

  return {
    type: ADD_PRODUCT_TO_WISHLIST,
    payload: newWishlist,
  };
};

export const removeProductFromWishlist = id => {
  const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || {};

  const { [id]: removedProduct, ...otherWishlistProducts } = localWishlist;
  localStorage.setItem('wishlist', JSON.stringify(otherWishlistProducts));

  return {
    type: REMOVE_PRODUCT_FROM_WISHLIST,
    payload: otherWishlistProducts,
  };
};

export const submitOrder =
  (values, products, history) => async (dispatch, getState) => {
    const orderedProducts = products.map(
      ({ _id, name, price, imageUrl, amount }) => ({
        _id,
        name,
        price,
        imageUrl,
        amount,
      })
    );

    const totalCost = Object.values(getState().cart)
      .reduce(
        (sum, currentItem) => (sum += currentItem.amount * currentItem.price),
        0
      )
      .toFixed(2);

    const { data } = await axios.post('/api/orders', {
      values,
      orderedProducts,
      totalCost,
    });
    history.push('/products');

    dispatch({ type: PUSH_ORDER, payload: data });
  };

export const fetchOrders = () => async dispatch => {
  const { data } = await axios.get('/api/orders');

  return dispatch({ type: FETCH_ORDERS, payload: data });
};
