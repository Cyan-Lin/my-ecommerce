import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import {
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
  // **
  // const dispatch = useDispatch();
  // const productId = match.params.id;

  const [qty, setQty] = useState(1);
  const heartRef = useRef(null);
  const plusRef = useRef(null);
  const minusRef = useRef(null);
  const addToCartRef = useRef(null);

  // 看了console的network, fetchProduct似乎比App.js的fetchUser, fetchProducts, fetchOrders還要早跑, 所以就不加Loader了
  // **後來先不加這個,就直接等fetchProducts完成就好,不然又多render一次
  // useEffect(() => {
  //   dispatch(fetchProduct(productId));
  // }, [dispatch, productId]);

  // heart icon turn red or not(initially and rerender), depends on whether there is a wishItem, and most importantly, there is a product
  // If we don't set product as dependency, this callback will not fire after the product has been fetched, if will stay 'not active'
  useEffect(() => {
    if (!heartRef.current || !product) return;
    if (!wishItem) {
      heartRef.current.classList.remove('active');
    } else {
      heartRef.current.classList.add('active');
    }
  }, [product, wishItem]);

  /**
   * 判斷qty+購物車與商品庫存數量 決定是否將按鈕(plusRef.current, minusRef.current, addToCartRef.current)反白(disable)
   * @product.countInStock {Number} 商品庫存數量
   * @qty {Number} 使用者畫面目前顯示數量
   * @cartItem?.amount {Number} 使用者購物車內此商品的數量(可能沒有所以用optional chaining)
   */
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

    if (product.countInStock <= (cartItem?.amount || 0) + qty)
      plusRef.current.classList.add('disable');

    if (qty === 1) minusRef.current.classList.add('disable');

    if (product.countInStock < (cartItem?.amount || 0) + qty)
      addToCartRef.current.classList.add('disable');
  }, [qty, product, cartItem?.amount]);

  // click heart icon
  const onWishlistIconClick = () => {
    if (!wishItem) return addProductToWishlist(product);

    removeProductFromWishlist(product._id);
  };

  // ckick minus button => if qty > 1 (2, 3, ...)
  const onMinusClick = () => {
    if (qty > 1) return setQty(qty - 1);
  };

  // click plus button => if qty > 0 (1, 2, ...) and countInStock > (qty + cartItem?.amount)
  const onPlusClick = () => {
    if (qty > 0 && product.countInStock > (cartItem?.amount || 0) + qty) {
      setQty(qty + 1);
    }
  };

  // click add-to-cart button => clearTimeout
  // if product.countInStock >= (cartItem?.amount || 0) + qty and addToCartRef.current has no disable class, add disable-interval class then setTimeout to remove disable-interval class in 0.8 sec
  const onAddProductToCartClick = () => {
    let removeClass;
    clearTimeout(removeClass);
    if (
      product.countInStock >= (cartItem?.amount || 0) + qty &&
      !addToCartRef.current?.classList.contains('disable-interval')
    ) {
      addProductToCart(product, qty);
      setQty(1);
      addToCartRef.current.classList.add('btn--add-to-cart-animation');
      addToCartRef.current.classList.add('disable-interval');
      removeClass = setTimeout(() => {
        addToCartRef.current?.classList.remove('btn--add-to-cart-animation');
        addToCartRef.current?.classList.remove('disable-interval');
      }, 800);
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
            <div className="view__name">{name}</div>
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

  // product不為空(空表示沒有此商品)的情況下renderView()
  return product ? renderView() : '';
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    product: state.products && state.products[id],
    wishItem: state.wishlist[id],
    cartItem: state.cart[id],
  };
};

export default connect(mapStateToProps, {
  addProductToCart,
  addProductToWishlist,
  removeProductFromWishlist,
})(ProductView);
