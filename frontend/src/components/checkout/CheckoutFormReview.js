import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import inputFields from './inputFields';
import { submitOrder } from '../../actions';

const CheckoutFormReview = ({
  onCancel,
  formValues,
  submitOrder,
  cartProducts,
  history,
}) => {
  console.log(formValues);
  console.log(cartProducts);
  console.log(history);

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

      <div className="form__action">
        <button onClick={onCancel} className="btn btn--rectangle btn--orange">
          Back
        </button>
        <button
          onClick={() => submitOrder(formValues, cartProducts, history)}
          className="btn btn--rectangle btn--green"
        >
          Confirm
        </button>
      </div>
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
