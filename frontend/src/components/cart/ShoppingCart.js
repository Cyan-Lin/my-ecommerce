import React from 'react';
import { connect } from 'react-redux';

import CartItem from './CartItem';

const ShoppingCart = ({ cart, itemAmount, orderTotal }) => {
  console.log(itemAmount, orderTotal);
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
            Items<span>{itemAmount}</span>
          </div>
          <div className="cart__total-order">
            Order Total<span>NT${orderTotal.toFixed(2)}</span>
          </div>
          <button className="btn btn--rectangle">Checkout</button>
        </div>
      </div>
    </>
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
