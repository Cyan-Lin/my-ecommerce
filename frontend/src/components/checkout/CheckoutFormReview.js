// form review and card main component

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import inputFields from './inputFields';
import { ELEMENTS_OPTIONS } from '../../config';
import Loader from '../Loader';
import CardForm from './CardForm';

const CheckoutFormReview = ({ onCancel, formValues }) => {
  const [orderDealing, setOrderDealing] = useState(false);

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

  // console.log(formValues);
  // console.log(cartProducts);
  // console.log(history);

  const renderReviewForm = () => {
    return inputFields.map(({ label, name }, i) => {
      return (
        <div key={i} className="form__field">
          <div className="form__label">{label}</div>
          <div className="form__input form__input--review">
            {formValues[name]}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="checkout-form">
      <h2 className="heading-tertiary">Please confirm your entries</h2>
      <div className="form__content">{renderReviewForm()}</div>

      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CardForm onCancel={onCancel} setOrderDealing={setOrderDealing} />
      </Elements>

      {orderDealing ? <Loader /> : ''}

      {/* <div className="form__action">
        <button
          onClick={() => submitOrder(formValues, cartProducts, history)}
          className="btn btn--rectangle btn--green"
        >
          Confirm
        </button>
      </div> */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    formValues: state.form.checkoutForm.values,
  };
};

export default connect(mapStateToProps)(CheckoutFormReview);
