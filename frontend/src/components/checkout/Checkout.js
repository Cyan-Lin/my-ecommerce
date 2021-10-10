import React, { useState, useEffect } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import CheckoutCart from './CheckoutCart';
import CheckoutForm from './CheckoutForm';
import CheckoutFormReview from './CheckoutFormReview';

const Checkout = ({ auth, cart, history }) => {
  const [showFormReview, setShowFormReview] = useState(false);

  useEffect(() => {
    if (!auth || cart.length === 0) history.push('/products');
  }, [auth, cart.length, history]);

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

export default connect(mapStateToprops)(
  reduxForm({
    form: 'checkoutForm',
  })(Checkout)
);
