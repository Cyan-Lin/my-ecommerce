import React, { useState } from 'react';
import { connect } from 'react-redux';

import CheckoutCartItem from './CheckoutCartItem';

const CheckoutCart = ({ cart, itemAmount, orderTotal }) => {
  const [toggle, setToggle] = useState(false);

  const renderCartItems = () => {
    return cart.map(item => <CheckoutCartItem key={item._id} product={item} />);
  };

  return (
    <div className="checkout-cart">
      <h2
        className="heading-tertiary clickable"
        onClick={() => setToggle(!toggle)}
      >
        Your Cart
        <span className={`checkout-cart__toggle ${toggle ? 'active' : ''}`}>
          &nbsp;
        </span>
      </h2>
      <div className={`checkout-cart__box ${toggle ? 'active' : ''}`}>
        <ul className="checkout-cart__list">{renderCartItems()}</ul>
        <div className="checkout-cart__action">
          <div className="checkout-cart__total-item">
            Items<span>{itemAmount}</span>
          </div>
          <div className="checkout-cart__total-order">
            Order Total<span>NT${orderTotal.toFixed(2)}</span>
          </div>
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

export default connect(mapStateToProps)(CheckoutCart);
