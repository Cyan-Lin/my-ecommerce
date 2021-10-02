import React, { useState } from 'react';
import { connect } from 'react-redux';

import { editProductInCart, removeProductFromCart } from '../actions';

const CartItem = ({
  product: { amount, imageUrl, name, price, countInStock, _id },
  removeProductFromCart,
  editProductInCart,
}) => {
  const [qty, setQty] = useState(amount);

  const onMinusClick = () => {
    // 此function中的qty值為相同,雖然setQty會立即rerender,但是在次function中跑完之前qty是不變的
    if (qty > 1) setQty(qty - 1);
    editProductInCart(_id, qty - 1);
  };

  const onPlusClick = () => {
    if (qty > 0) setQty(qty + 1);
    editProductInCart(_id, qty + 1);
  };

  return (
    <li className="cart__item">
      <div className="cart__img-box">
        <img className="cart__img" src={imageUrl} alt="product pic" />
      </div>
      <div className="cart__product-box">
        <div className="cart__product-name">{name}</div>
        <div className="cart__product-price">NT${price}</div>
        <div className="cart__product-action">
          <div className="cart__product-amount">
            <button onClick={onMinusClick} className="btn btn--calc">
              <i className="fas fa-minus"></i>
            </button>
            <span>{qty}</span>
            <button onClick={onPlusClick} className="btn btn--calc">
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <button
            onClick={() => removeProductFromCart(_id)}
            className="btn btn--delete"
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </li>
  );
};

export default connect(null, { removeProductFromCart, editProductInCart })(
  CartItem
);
