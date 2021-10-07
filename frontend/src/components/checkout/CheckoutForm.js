import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import inputFields from './inputFields';
import CheckoutInputField from './CheckoutInputField';

const CheckoutForm = props => {
  // console.log(props);

  const renderInputFields = () => {
    return inputFields.map((field, i) => {
      return <Field key={i} {...field} component={CheckoutInputField} />;
    });
  };

  return (
    <form
      onSubmit={props.handleSubmit(props.onFormSubmit)}
      className="checkout-form"
    >
      <h2 className="heading-tertiary">Checkout</h2>
      <div className="form__content">{renderInputFields()}</div>

      <div className="form__action">
        <Link to="/shopping_cart" className="btn btn--rectangle btn--orange">
          Cancel
        </Link>
        <button className="btn btn--rectangle btn--green">Next</button>
      </div>
    </form>
  );
};

const validate = values => {
  const errors = {};
  //eslint-disable-next-line
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line

  if (regex.test(values.email) === false) errors.email = 'Invalid email';
  inputFields.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${label}`;
    }
  });

  return errors;
};

export default reduxForm({
  form: 'checkoutForm',
  validate,
  destroyOnUnmount: false,
})(CheckoutForm);
