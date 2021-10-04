import React, { useState } from 'react';
import CheckoutCartItem from './CheckoutCartItem';

const CheckoutCart = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="checkout-cart">
      <h2
        className="heading-tertiary clickable"
        onClick={() => setToggle(!toggle)}
      >
        Your Cart{' '}
        <span className={`checkout-cart__toggle ${toggle ? 'active' : ''}`}>
          &nbsp;
        </span>
      </h2>
      <div className={`checkout-cart__box ${toggle ? 'active' : ''}`}>
        <ul className="checkout-cart__list">
          <CheckoutCartItem />
          <CheckoutCartItem />
        </ul>
        <div className="checkout-cart__action">
          <div className="checkout-cart__total-item">
            Items<span>2</span>
          </div>
          <div className="checkout-cart__total-order">
            Order Total<span>NT$6666</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;
