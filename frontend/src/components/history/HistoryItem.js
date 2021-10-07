import React from 'react';

const historyItem = ({
  product: { imageUrl, name, amount, price, transactionDate },
}) => {
  return (
    <li className="history__item">
      <div className="history__img-box">
        <img className="history__img" src={imageUrl} alt="product pic" />
      </div>
      <div className="history__product-info">
        <div className="history__product-name">{name}</div>
        <div className="history__qty-price">
          <div className="history__product-qty">Quantity: {amount}</div>
          <div className="history__product-price">NT${price}</div>
        </div>
        <div className="history__date">
          {new Date(transactionDate).toLocaleString()}
        </div>
      </div>
    </li>
  );
};

export default historyItem;
