// main component

import React, { useState, useEffect } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import CheckoutCart from './CheckoutCart';
import CheckoutForm from './CheckoutForm';
import CheckoutFormReview from './CheckoutFormReview';

const Checkout = ({ auth, cart, history }) => {
  const [showFormReview, setShowFormReview] = useState(false);

  // 若使用者直接輸入此網址且未登入或購物車為空, 則直接轉址productsList
  // 後來測試發現實際上因為網頁刷新造成redux清空,資料要重新取得,所以初始狀態下auth為null,cart.length===0
  // 判斷式一定會執行,所以結論是只能從ShoppingCart進入checkout,從網址輸入就會直接轉到/shopping_cart
  useEffect(() => {
    if (!auth || cart.length === 0) history.push('/shopping_cart');
  }, [auth, cart.length, history]);

  // 切換顯示form或reviewForm
  const renderForm = () => {
    if (showFormReview) {
      return <CheckoutFormReview onCancel={() => setShowFormReview(false)} />;
    }
    return <CheckoutForm onFormSubmit={() => setShowFormReview(true)} />;
  };

  return (
    <div className="checkout">
      {renderForm()}

      <CheckoutCart />
    </div>
  );
};

const mapStateToprops = state => {
  return { cart: Object.values(state.cart), auth: state.auth };
};

// 離開此component時reduxForm將會清空
export default connect(mapStateToprops)(
  reduxForm({
    form: 'checkoutForm',
  })(Checkout)
);
