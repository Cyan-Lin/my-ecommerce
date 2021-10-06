import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CartItem from './CartItem';

const ShoppingCart = ({ cart, itemAmount, orderTotal }) => {
  const renderCartItems = () => {
    return cart.map(item => <CartItem key={item._id} product={item} />);
  };

  return (
    <div className="shopping-cart">
      <h2 className="heading-secondary">Shopping Cart</h2>
      <div className="cart">
        <ul className="cart__list">{renderCartItems()}</ul>
        <div className="cart__action">
          <div className="cart__total-item">
            Items<span>{itemAmount}</span>
          </div>
          <div className="cart__total-order">
            Order Total<span>NT${orderTotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn btn--rectangle btn--green">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
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
