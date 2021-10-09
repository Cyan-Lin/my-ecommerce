import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import HistoryItem from './HistoryItem';
// import { fetchOrders } from '../../actions';

const TransactionHistory = ({ orders }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchOrders());
  // }, [dispatch]);

  const renderHistoryItem = () => {
    if (!orders.length) return '';

    const productArr = orders.reduce((accArr, currentOrder) => {
      console.log(currentOrder);
      currentOrder.orderedProducts.forEach(product => {
        product.transactionDate = currentOrder.transactionDate;
        accArr.push(product);
      });
      return accArr;
    }, []);

    console.log(productArr);
    return productArr.map(product => (
      <HistoryItem key={product._id} product={product} />
    ));
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

export default connect(mapStateToProps)(TransactionHistory);
