import React from 'react';
import { connect } from 'react-redux';

import ProductCard from '../products/ProductCard';

// wishlist 是從localStorage 引入(詳見App.js loadLocalStorage())
const Wishlist = ({ wishlist }) => {
  // 重複使用ProductCard component
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
