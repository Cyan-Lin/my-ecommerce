import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CartItem from './CartItem';

// cart 是從localStorage 引入(詳見App.js loadLocalStorage())
const ShoppingCart = ({ auth, cart, itemAmount, orderTotal }) => {
  const renderCartItems = () => {
    return cart.map(item => <CartItem key={item._id} product={item} />);
  };

  // 依據使用者是否登入(auth)決定checkout button 的顯示與功能
  const renderCheckoutButton = () => {
    return auth ? (
      <Link to="/checkout" className="btn btn--rectangle btn--green">
        Checkout
      </Link>
    ) : (
      <a href="/auth/google" className="btn btn--rectangle btn--green">
        Login to Checkout
      </a>
    );
  };

  return (
    <div className="shopping-cart">
      <h2 className="heading-secondary">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="heading-quaternary text-center">
          Your shopping cart is empty ✨
        </p>
      ) : (
        <div className="cart">
          <ul className="cart__list">{renderCartItems()}</ul>
          <div className="cart__action">
            <div className="cart__total-item">
              Items<span>{itemAmount}</span>
            </div>
            <div className="cart__total-order">
              Order Total<span>NT${orderTotal.toFixed(2)}</span>
            </div>
            {renderCheckoutButton()}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: Object.values(state.cart),
    itemAmount: Object.values(state.cart).reduce(
      (sum, currentItem) => (sum += currentItem.amount),
      0
    ),
    orderTotal: Object.values(state.cart).reduce(
      (sum, currentItem) => (sum += currentItem.amount * currentItem.price),
      0
    ),
  };
};

export default connect(mapStateToProps)(ShoppingCart);
