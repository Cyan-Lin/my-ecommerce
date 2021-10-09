import React, { useEffect, useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';

import {
  fetchProduct,
  addProductToCart,
  addProductToWishlist,
  removeProductFromWishlist,
} from '../../actions';

const ProductView = ({
  match,
  product,
  addProductToCart,
  addProductToWishlist,
  removeProductFromWishlist,
  wishItem,
  cartItem,
}) => {
  const dispatch = useDispatch();
  const productId = match.params.id;

  const [qty, setQty] = useState(1);
  const heartRef = useRef(null);
  const plusRef = useRef(null);
  const minusRef = useRef(null);
  const addToCartRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (heartRef.current) {
      if (!wishItem) {
        heartRef.current.classList.remove('active');
      } else {
        heartRef.current.classList.add('active');
      }
    }
  }, [wishItem]);

  useEffect(() => {
    if (
      !product ||
      !plusRef.current ||
      !minusRef.current ||
      !addToCartRef.current
    )
      return;
    plusRef.current.classList.remove('disable');
    minusRef.current.classList.remove('disable');

    if (
      product.countInStock <= qty ||
      product.countInStock <= (cartItem?.amount || 0) + qty
    )
      plusRef.current.classList.add('disable');

    if (qty === 1) minusRef.current.classList.add('disable');

    // console.log(product.countInStock, qty, cartItem?.amount);
    if (
      product.countInStock < qty ||
      product.countInStock < (cartItem?.amount || 0) + qty
    )
      addToCartRef.current.classList.add('disable');
  }, [qty, product, cartItem?.amount]);

  const onWishlistIconClick = () => {
    if (!wishItem) {
      return addProductToWishlist(product);
    }

    removeProductFromWishlist(product._id);
  };

  const onMinusClick = () => {
    if (qty > 1) return setQty(qty - 1);
  };

  const onPlusClick = () => {
    if (
      qty > 0 &&
      product.countInStock > qty &&
      product.countInStock > (cartItem?.amount || 0) + qty
    ) {
      setQty(qty + 1);
    }
  };

  const onAddProductToCartClick = () => {
    let removeClass;
    if (
      product.countInStock >= (cartItem?.amount || 0) + qty &&
      !addToCartRef.current?.classList.contains('disable-interval')
    ) {
      addProductToCart(product, qty);
      setQty(1);
      addToCartRef.current.classList.add('btn--add-to-cart');
      addToCartRef.current.classList.add('disable-interval');
      clearTimeout(removeClass);
      removeClass = setTimeout(() => {
        addToCartRef.current?.classList.remove('btn--add-to-cart');
        addToCartRef.current?.classList.remove('disable-interval');
      }, 800);
      console.log(cartItem);
    }
  };

  const renderView = () => {
    const { name, imageUrl, price, description } = product;

    return (
      <div className="product-view">
        <div className="view__img-box">
          <img src={imageUrl} alt="view pic" className="view__img" />
        </div>
        <div className="view__info-action">
          <div className="view__info">
            <div className="view__name">{name}e</div>
            <div className="view__price">NT${price}</div>
            <div className="view__box">
              <div className="view__rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
                <i className="far fa-star"></i>
              </div>
              <button
                ref={heartRef}
                onClick={onWishlistIconClick}
                className="btn btn--heart"
              >
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
                <button
                  ref={minusRef}
                  onClick={onMinusClick}
                  className="btn btn--calc"
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span>{qty}</span>
                {/* <input type="text" disabled value={qty} /> */}
                <button
                  ref={plusRef}
                  onClick={onPlusClick}
                  className="btn btn--calc"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <button
                ref={addToCartRef}
                onClick={onAddProductToCartClick}
                className="btn btn--rectangle btn--green"
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
  const id = ownProps.match.params.id;
  return {
    product: state.products[id],
    wishItem: state.wishlist[id],
    cartItem: state.cart[id],
  };
};

export default connect(mapStateToProps, {
  addProductToCart,
  addProductToWishlist,
  removeProductFromWishlist,
})(ProductView);
