import React from 'react';
import CheckoutCart from './CheckoutCart';

import CheckoutForm from './CheckoutForm';

const Checkout = () => {
  return (
    <div className="checkout">
      <CheckoutForm />

      <CheckoutCart />
    </div>
  );
};

export default Checkout;
