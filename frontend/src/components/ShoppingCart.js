import React from 'react';
import { connect } from 'react-redux';

import CartItem from './CartItem';

const ShoppingCart = ({ cart }) => {
  const renderCartItems = () => {
    return cart.map(item => <CartItem key={item._id} product={item} />);
  };

  return (
    <>
      <h2 className="heading-secondary">Shopping Cart</h2>
      <div className="shopping-cart">
        <ul className="cart__list">
          {renderCartItems()}
          {/* <CartItem />
          <CartItem />
          <CartItem /> */}
        </ul>
        <div className="cart__action">
          <div className="cart__total-item">
            Items<span>4</span>
          </div>
          <div className="cart__total-order">
            Order Total<span>NT$6,986.73</span>
          </div>
          <button className="btn btn--rectangle">Checkout</button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return { cart: Object.values(state.cart) };
};

export default connect(mapStateToProps)(ShoppingCart);
