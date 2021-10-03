import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { addProductToWishlist } from '../../actions';

const ProductCard = ({ product, addProductToWishlist, wishItem }) => {
  const { imageUrl, name, price, _id } = product;
  const history = useHistory();

  const actionItemRef = useRef(null);

  useEffect(() => {
    if (actionItemRef.current) {
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
    }
  }, [wishItem]);

  const onCardClick = () => {
    history.push(`/products/${_id}`);
  };

  const onWishlistIconClick = e => {
    e.stopPropagation();
    if (!wishItem) {
      addProductToWishlist(product);
    }
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

export default connect(mapStateToProps, { addProductToWishlist })(ProductCard);
