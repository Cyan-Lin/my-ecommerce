import React from 'react';
import HistoryItem from './HistoryItem';

const TransactionHistory = () => {
  return (
    <>
      <h2 className="heading-secondary">Transaction History</h2>
      <div className="transaction-history">
        <ul className="history__list">
          <HistoryItem />
          <HistoryItem />
          <HistoryItem />
        </ul>
      </div>
    </>
  );
};

export default TransactionHistory;
