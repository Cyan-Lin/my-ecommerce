import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import inputFields from './inputFields';
import { submitOrder } from '../../actions';
import { ELEMENTS_OPTIONS } from '../../config';
import Loader from '../Loader';

const CheckoutFormReview = ({
  onCancel,
  formValues,
  submitOrder,
  cartProducts,
  history,
}) => {
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

  // stripe form 要放在 components內(首字母大寫)
  const CardForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async e => {
      e.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

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
        <h2 className="heading-tertiary">
          Please Enter your Credit Card Number
        </h2>
        <div className="form__card-element">
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

  return (
    <div className="checkout-form">
      <h2 className="heading-tertiary">Please confirm your entries</h2>
      <div className="form__content">{renderReviewForm()}</div>

      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CardForm />
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
    cartProducts: Object.values(state.cart),
  };
};

export default connect(mapStateToProps, { submitOrder })(
  withRouter(CheckoutFormReview)
);
