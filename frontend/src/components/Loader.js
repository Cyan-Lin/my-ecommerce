import React from 'react';
import ReactDOM from 'react-dom';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="loader__container">
      <div className="loader">
        <div className="loader__text">Loading</div>
        <div className="loader__ring"></div>
      </div>
    </div>,
    document.querySelector('#loader')
  );
};

export default Loader;
