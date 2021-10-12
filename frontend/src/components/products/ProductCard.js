import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { addProductToWishlist, removeProductFromWishlist } from '../../actions';

const ProductCard = ({
  product,
  addProductToWishlist,
  removeProductFromWishlist,
  wishItem,
}) => {
  const { imageUrl, name, price, _id } = product;
  const history = useHistory();

  const actionItemRef = useRef(null);

  // 判斷是否activate card__action-item 以及 heart button
  useEffect(() => {
    // 因為此component的product是從parent那裏拿來的,所以不需要把product加入dependency
    if (!actionItemRef.current) return;
    if (!wishItem) {
      actionItemRef.current.classList.remove('active');
      actionItemRef.current
        .querySelector('.btn--heart')
        .classList.remove('active');
    } else {
      actionItemRef.current.classList.add('active');
      actionItemRef.current
        .querySelector('.btn--heart')
        .classList.add('active');
    }
  }, [wishItem]);

  // 點擊card前往productView
  const onCardClick = () => {
    history.push(`/products/${_id}`);
  };

  // 點擊heart button 加入或移除至wishlist
  const onWishlistIconClick = e => {
    e.stopPropagation();
    if (!wishItem) return addProductToWishlist(product);

    removeProductFromWishlist(_id);
  };

  return (
    <div className="card" onClick={onCardClick}>
      <div className="card__img-box">
        <img src={imageUrl} alt="product pic" className="card__img" />
        <div className="card__action">
          <div ref={actionItemRef} className="card__action-item">
            <button
              onClick={onWishlistIconClick}
              className="btn btn--absolute btn--heart"
            >
              <i className="fas fa-heart"></i>
              <span className="card__action-text">Add to Wishlist</span>
            </button>
          </div>
          {/* <div className="card__action-item">
            <button onClick={onAddToCartClick} className="btn btn--absolute">
              <i className="fas fa-shopping-cart"></i>
              <span className="card__action-text">Add to Cart</span>
            </button>
          </div> */}
        </div>
      </div>
      <div className="card__content">
        <h3 className="card__name">{name}</h3>
        <div className="card__price-rating">
          <h4 className="card__price">${price}</h4>
          <div className="card__rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
            <i className="far fa-star"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { wishItem: state.wishlist[ownProps.product._id] };
};

export default connect(mapStateToProps, {
  addProductToWishlist,
  removeProductFromWishlist,
})(ProductCard);
