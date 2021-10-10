import React from 'react';
import { connect } from 'react-redux';

import HistoryItem from './HistoryItem';

const TransactionHistory = ({ orders }) => {
  const renderHistoryItem = () => {
    if (!orders.length) return '';

    const productArr = orders.reduce((accArr, currentOrder) => {
      currentOrder.orderedProducts.forEach(product => {
        product.transactionDate = currentOrder.transactionDate;
        accArr.push(product);
      });
      return accArr;
    }, []);

    return productArr.map(product => (
      <HistoryItem key={product._id} product={product} />
    ));
  };

  return (
    <>
      <h2 className="heading-secondary">Transaction History</h2>
      {orders.length === 0 ? (
        <p className="heading-quaternary text-center">
          Your transaction history is empty ✨
        </p>
      ) : (
        <div className="transaction-history">
          <ul className="history__list">{renderHistoryItem()}</ul>
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return { orders: Object.values(state.orders) };
};

export default connect(mapStateToProps)(TransactionHistory);
