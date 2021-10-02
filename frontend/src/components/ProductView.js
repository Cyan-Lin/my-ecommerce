import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchProduct, addProductToCart } from '../actions';

const ProductView = ({ match, fetchProduct, product, addProductToCart }) => {
  const productId = match.params.id;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchProduct(productId);
  }, [fetchProduct, productId]);

  const onWishlistIconClick = () => {};

  const onMinusClick = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const onPlusClick = () => {
    if (qty > 0) setQty(qty + 1);
  };

  const renderView = () => {
    const { name, imageUrl, price, description, countInStock } = product;

    return (
      <div className="product-view">
        <div className="view__img-box">
          <img src={imageUrl} alt="view pic" className="view__img" />
        </div>
        <div className="view__info-action">
          <div className="view__info">
            <div className="view__name">{name}e</div>
            <div className="view__box">
              <div className="view__price">NT${price}</div>
              <button onClick={onWishlistIconClick} className="btn">
                <i className="fas fa-heart"></i>
              </button>
            </div>

            <div className="view__detail">
              <p className="view__detail-text">{description}</p>
            </div>
          </div>
          <div className="view__action">
            <div className="view__add-to-cart">
              <div className="view__qty-controller">
                <button onClick={onMinusClick} className="btn btn--calc">
                  <i className="fas fa-minus"></i>
                </button>
                <span>{qty}</span>
                {/* <input type="text" disabled value={qty} /> */}
                <button onClick={onPlusClick} className="btn btn--calc">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <button
                onClick={() => addProductToCart(product, qty)}
                className="btn btn--rectangle"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return product ? renderView() : '';
};

const mapStateToProps = (state, ownProps) => {
  return { product: state.products[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchProduct, addProductToCart })(
  ProductView
);
