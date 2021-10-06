import React from 'react';

const historyItem = () => {
  return (
    <li className="history__item">
      <div className="history__img-box">
        <img
          className="history__img"
          src="https://img.abercrombie.com/is/image/anf/KIC_122-1570-1006-178_prod1?policy=product-small"
          alt="product pic"
        />
      </div>
      <div className="history__product-info">
        <div className="history__product-name">
          Essential Oversized Full-Zip Hoodie
        </div>
        <div className="history__qty-price">
          <div className="history__product-qty">Quantity: 3</div>
          <div className="history__product-price">NT$1,959.69</div>
        </div>
        <div className="history__date">2021/10/1</div>
      </div>
    </li>
  );
};

export default historyItem;
