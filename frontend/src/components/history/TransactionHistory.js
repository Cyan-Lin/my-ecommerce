import React from 'react';
import { connect } from 'react-redux';

import HistoryItem from './HistoryItem';

const TransactionHistory = ({ orders }) => {
  const renderHistoryItem = () => {
    // 初始狀態下orders===null(見orderReducer), 而fetch完order時,則為object
    if (orders === null) return '';

    // 若orders是empty object, 則Object.values(orders)為empty array
    const ordersArr = Object.values(orders);

    const productArr = ordersArr.reduce((accArr, currentOrder) => {
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
      {/* 在初始情況(orders=null)與沒有購物紀錄(orders={}) 直接對使用者顯示沒有紀錄, 且在orders===null(初始狀態)時, Loader將會顯示(詳見Navigation.js) */}
      {orders === null || Object.values(orders) === 0 ? (
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
  return { orders: state.orders };
};

export default connect(mapStateToProps)(TransactionHistory);
