import React from 'react';
import { connect } from 'react-redux';

import ProductCard from '../products/ProductCard';

const Wishlist = ({ wishlist }) => {
  const renderWishList = () => {
    return wishlist.map(item => <ProductCard key={item._id} product={item} />);
  };

  return (
    <>
      <h2 className="heading-secondary">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="heading-quaternary text-center">
          Your wishlist is empty ✨
        </p>
      ) : (
        <div className="product-list">{renderWishList()}</div>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return { wishlist: Object.values(state.wishlist) };
};

export default connect(mapStateToProps)(Wishlist);
