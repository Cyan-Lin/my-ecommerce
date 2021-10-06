import React from 'react';

const CheckoutField = ({
  meta: { error, touched },
  input,
  for_id,
  label,
  type,
}) => {
  // console.log(props);

  const className =
    touched && error ? 'form__input form__input--invalid' : 'form__input';

  return (
    <div className="form__field">
      <label htmlFor={for_id} className="form__label">
        {label}
      </label>
      <input {...input} type={type} className={className} id={for_id} />
      <div className="form__error-text">{touched && error}</div>
    </div>
  );
};

export default CheckoutField;
