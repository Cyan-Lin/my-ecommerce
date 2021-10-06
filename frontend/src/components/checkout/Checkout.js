import React, { useState } from 'react';
import { reduxForm } from 'redux-form';

import CheckoutCart from './CheckoutCart';
import CheckoutForm from './CheckoutForm';
import CheckoutFormReview from './CheckoutFormReview';

const Checkout = () => {
  const [showFormReview, setShowFormReview] = useState(false);

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

export default reduxForm({
  form: 'checkoutForm',
})(Checkout);
