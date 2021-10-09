import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import Navigation from './Navigation';
import ProductList from './products/ProductList';
import Landing from './Landing';
import ShoppingCart from './cart/ShoppingCart';
import ProductView from './products/ProductView';
import TransactionHistory from './history/TransactionHistory';
import Wishlist from './wishlist/Wishlist';
import Checkout from './checkout/Checkout';

import {
  fetchUser,
  fetchProducts,
  loadLocalStorage,
  fetchOrders,
} from '../actions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLocalStorage());
    dispatch(fetchUser());
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="container">
      <BrowserRouter>
        <>
          <Navigation />
          <div className="content">
            <Route exact path="/" component={Landing} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/products/:id" component={ProductView} />
            <Route exact path="/shopping_cart" component={ShoppingCart} />
            <Route
              exact
              path="/transaction_history"
              component={TransactionHistory}
            />
            <Route exact path="/wishlist" component={Wishlist} />
            <Route exact path="/checkout" component={Checkout} />
          </div>
        </>
      </BrowserRouter>
    </div>
  );
};

export default connect(null)(App);
