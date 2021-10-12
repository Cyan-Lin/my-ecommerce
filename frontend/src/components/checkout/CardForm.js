// credit card input field

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { submitOrder } from '../../actions';

// stripe form 規定要是 component(首字母大寫) (CardForm)
const CardForm = ({
  formValues,
  cartProducts,
  onCancel,
  submitOrder,
  history,
  setOrderDealing,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async e => {
    e.preventDefault();

    // Stripe.js has not loaded yet.
    // Make sure to disable form submission until Stripe.js has loaded.
    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    // id need to send to backend (用paymentMethod好像就不用token之類的,直接送後端就好了)
    // console.log(paymentMethod);
    // console.log(error?.message);
    if (error) return;

    // send checkout form, cartProducts, history, and Loader setter to backend
    setOrderDealing(true);
    submitOrder(formValues, cartProducts, history, setOrderDealing);
  };

  return (
    <form className="form__card-form" onSubmit={handleSubmit}>
      <h2 className="heading-tertiary">Please Enter your Credit Card Number</h2>
      <div className="form__card-element">
        {/* 信用卡輸入的位置 */}
        <CardElement />
      </div>

      <div className="form__action">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn--rectangle btn--orange"
        >
          Back
        </button>
        <button className="btn btn--rectangle btn--green">Confirm</button>
      </div>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    formValues: state.form.checkoutForm.values,
    cartProducts: Object.values(state.cart),
  };
};

export default connect(mapStateToProps, { submitOrder })(withRouter(CardForm));
