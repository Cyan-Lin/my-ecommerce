import React from 'react';

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="navigation__logo-box">
        <span className="navigation__logo-text">CyShop</span>
      </div>
      <div className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            <a href="/#" className="navigation__link">
              <i class="fas fa-history"></i>
              <span>History</span>
            </a>
          </li>
          <li className="navigation__item">
            <a href="/#" className="navigation__link">
              <i class="fas fa-heart"></i>
              <span>Favorite</span>
            </a>
          </li>
          <li className="navigation__item">
            <a href="/#" className="navigation__link">
              <i class="fas fa-shopping-cart"></i>
              <span>Cart</span>
            </a>
          </li>
          <li className="navigation__item">
            <a href="/#" className="navigation__link">
              <i class="fab fa-google"></i>
              <span>Login</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
