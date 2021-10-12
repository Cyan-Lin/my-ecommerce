// checkout redux form

import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import inputFields from './inputFields';
import CheckoutInputField from './CheckoutInputField';

const CheckoutForm = ({ handleSubmit, onFormSubmit }) => {
  // render form label and input
  const renderInputFields = () => {
    return inputFields.map((field, i) => {
      return <Field key={i} {...field} component={CheckoutInputField} />;
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="checkout-form">
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
  // 下面這行用來阻止warning, regex與regex.test(values.email)用來判斷email符合格式
  //eslint-disable-next-line
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line

  if (regex.test(values.email) === false) errors.email = 'Invalid email';
  // 判斷所有input是否有空白
  inputFields.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${label}`;
    }
  });

  return errors;
};

// 離開此component, reduxForm的value將不會消失
export default reduxForm({
  form: 'checkoutForm',
  validate,
  destroyOnUnmount: false,
})(CheckoutForm);
