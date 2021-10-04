import React from 'react';

const CheckoutCartItem = () => {
  return (
    <li className="checkout-cart__item">
      <div className="checkout-cart__img-box">
        <img
          className="checkout-cart__img"
          src="https://img.abercrombie.com/is/image/anf/KIC_122-1570-1006-178_prod1?policy=product-large"
          alt="product pic"
        />
      </div>
      <div className="checkout-cart__product-box">
        <div className="checkout-cart__product-name">
          Essential Oversized Full-Zip Hoodie
        </div>
        <div className="checkout-cart__product-price">NT$6666</div>
        <div className="checkout-cart__product-amount">
          Quantity:<span>3</span>
        </div>
      </div>
    </li>
  );
};

export default CheckoutCartItem;
