import React from 'react';

const CheckoutField = ({ meta, input, for_id, label, type }) => {
  // console.log(props);

  return (
    <div className="form__field">
      <label htmlFor={for_id} className="form__label">
        {label}
      </label>
      <input {...input} type={type} className="form__input" id={for_id} />
    </div>
  );
};

export default CheckoutField;
