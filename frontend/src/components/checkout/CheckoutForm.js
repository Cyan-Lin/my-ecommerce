import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import inputFields from './inputFields';
import CheckoutInputField from './CheckoutInputField';

const CheckoutForm = () => {
  const renderInputFields = () => {
    return inputFields.map((field, i) => {
      return <Field key={i} {...field} component={CheckoutInputField} />;
    });
  };

  return (
    <div className="checkout-form">
      <h2 className="heading-tertiary">Checkout</h2>
      <div className="form__content">{renderInputFields()}</div>

      <div className="form__action">
        <button className="btn btn--rectangle btn--orange">Cancel</button>
        <button className="btn btn--rectangle btn--green">Next</button>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'checkoutForm',
})(CheckoutForm);
