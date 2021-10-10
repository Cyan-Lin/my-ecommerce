import React from 'react';
import { connect } from 'react-redux';

import ProductCard from './ProductCard';
// import Loader from '../Loader';

const ProductList = ({ products }) => {
  const renderProductCard = () => {
    return products.map(product => (
      <ProductCard key={product._id} product={product} />
    ));
  };

  return (
    <>
      <h2 className="heading-secondary">New Arrival</h2>
      <div className="product-list">{renderProductCard()}</div>
      {/* <Loader /> */}
    </>
  );
};

const mapStateToProps = state => {
  return { products: Object.values(state.products) };
};

export default connect(mapStateToProps)(ProductList);
