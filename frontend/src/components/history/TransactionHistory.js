import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import HistoryItem from './HistoryItem';
import { fetchOrders } from '../../actions';

const TransactionHistory = ({ fetchOrders, orders }) => {
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const renderHistoryItem = () => {
    console.log(orders);
    if (!orders.length) return '';

    return orders.map(order => {
      return <HistoryItem />;
    });
  };

  return (
    <>
      <h2 className="heading-secondary">Transaction History</h2>
      <div className="transaction-history">
        <ul className="history__list">{renderHistoryItem()}</ul>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return { orders: Object.values(state.orders) };
};

export default connect(mapStateToProps, { fetchOrders })(TransactionHistory);
