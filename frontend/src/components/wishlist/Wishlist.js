import React from 'react';
import { connect } from 'react-redux';

import ProductCard from '../products/ProductCard';

const Wishlist = ({ wishlist }) => {
  const renderWishList = () => {
    console.log(wishlist);

    return wishlist.map(item => <ProductCard product={item} />);
  };

  return (
    <>
      <h2 className="heading-secondary">My Wishlist</h2>
      <div className="product-list">{renderWishList()}</div>
    </>
  );
};

const mapStateToProps = state => {
  return { wishlist: Object.values(state.wishlist) };
};

export default connect(mapStateToProps)(Wishlist);
