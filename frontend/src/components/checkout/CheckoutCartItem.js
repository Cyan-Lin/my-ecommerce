import React from 'react';

const CheckoutCartItem = ({ product: { imageUrl, name, price, amount } }) => {
  return (
    <li className="checkout-cart__item">
      <div className="checkout-cart__img-box">
        <img className="checkout-cart__img" src={imageUrl} alt="product pic" />
      </div>
      <div className="checkout-cart__product-box">
        <div className="checkout-cart__product-name">{name}</div>
        <div className="checkout-cart__product-price">NT${price}</div>
        <div className="checkout-cart__product-amount">
          Quantity:<span>{amount}</span>
        </div>
      </div>
    </li>
  );
};

export default CheckoutCartItem;
