import React from 'react';
import { connect } from 'react-redux';

import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  const renderProductCard = () => {
    if (products === null) return '';
    const productsArr = Object.values(products);
    return productsArr.map(product => (
      <ProductCard key={product._id} product={product} />
    ));
  };

  return (
    <>
      <h2 className="heading-secondary">New Arrival</h2>
      <div className="product-list">{renderProductCard()}</div>
    </>
  );
};

const mapStateToProps = state => {
  return { products: state.products };
};

export default connect(mapStateToProps)(ProductList);
