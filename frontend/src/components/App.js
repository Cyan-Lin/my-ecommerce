import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navigation from './Navigation';
import ProductList from './ProductList';
import Landing from './Landing';

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <div className="">
          <Navigation />
          <Route exact path="/" component={Landing} />
          <Route exact path="/products" component={ProductList} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
