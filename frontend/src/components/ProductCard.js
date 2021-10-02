import React from 'react';
import { useHistory } from 'react-router-dom';

const ProductCard = ({
  product: { imageUrl, name, price, description, countInStock, _id },
}) => {
  const history = useHistory();

  const onCardClick = () => {
    history.push(`/products/${_id}`);
  };

  const onWishlistIconClick = e => {
    e.stopPropagation();
  };

  const onAddToCartClick = e => {
    e.stopPropagation();
  };

  return (
    <div className="card" onClick={onCardClick}>
      <div className="card__img-box">
        <img src={imageUrl} alt="product pic" className="card__img" />
        <div className="card__action">
          <div className="card__action-item">
            <button onClick={onWishlistIconClick} className="btn btn--absolute">
              <i className="fas fa-heart"></i>
              <span className="card__action-text">Add to Wishlist</span>
            </button>
          </div>
          <div className="card__action-item">
            <button onClick={onAddToCartClick} className="btn btn--absolute">
              <i className="fas fa-shopping-cart"></i>
              <span className="card__action-text">Add to Cart</span>
            </button>
          </div>
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

export default ProductCard;
