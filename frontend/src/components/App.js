import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from './Navigation';
import ProductList from './products/ProductList';
import Landing from './Landing';
import ShoppingCart from './cart/ShoppingCart';
import ProductView from './products/ProductView';
import TransactionHistory from './history/TransactionHistory';
import Wishlist from './wishlist/Wishlist';

import { fetchUser, fetchProducts } from '../actions';

const App = ({ fetchUser, fetchProducts }) => {
  useEffect(() => {
    fetchUser();
    fetchProducts();
  }, [fetchUser, fetchProducts]);

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
          </div>
        </>
      </BrowserRouter>
    </div>
  );
};

export default connect(null, { fetchUser, fetchProducts })(App);
