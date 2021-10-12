import React, { useRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from './Loader';

const Navigation = ({
  location,
  auth,
  products,
  amountOfWishItems,
  amountOfCartItems,
}) => {
  const { pathname } = location;

  const toggleRef = useRef(null);
  const navRef = useRef(null);

  // execpt logo link

  // trigger this everytime on pathname changing
  useEffect(() => {
    const navLinks = navRef.current?.querySelectorAll('.navigation__link');

    window.scrollTo(0, 0);
    navLinks?.forEach(navLink => {
      navLink.classList.remove('active');
      // add border-bottom
      if (navLink.dataset.tab === pathname) navLink.classList.add('active');
    });
  }, [pathname]);

  const onToggleClick = () => {
    toggleRef.current.classList.toggle('active');
    navRef.current.classList.toggle('active');
  };

  const onNavClick = e => {
    if (!e.target.closest('a[data-tab]')) return;

    // close menu
    toggleRef.current.classList.remove('active');
    navRef.current.classList.remove('active');
  };

  const renderGoogleLogin = () => {
    switch (auth) {
      // 剛進入網頁還未取得auth資料時
      case null:
        return <li className="navigation__item">Loading...</li>;
      // 未登入
      case false:
        return (
          <li className="navigation__item">
            <a href="/auth/google" className="navigation__link">
              <i className="fab fa-google"></i>
              <span>Login</span>
            </a>
          </li>
        );
      // 已登入
      default:
        return (
          <li className="navigation__item">
            <a href="/auth/logout" className="navigation__link">
              <i className="fab fa-google"></i>
              <span>Logout</span>
            </a>
          </li>
        );
    }
  };

  const renderNotification = amount => {
    if (!amount) return '';
    return <span className="navigation__notification">{amount}</span>;
  };

  const renderToggleNotification = amount => {
    return amount ? (
      <span className="navigation__toggle-notification">{amount}</span>
    ) : (
      ''
    );
  };

  return (
    <div className="navigation" onClick={onNavClick}>
      <div className="navigation__logo-box">
        <Link
          to={auth ? '/products' : '/'}
          data-tab="/"
          className="navigation__logo-link"
        >
          CyShop
        </Link>
      </div>
      <button
        ref={toggleRef}
        onClick={onToggleClick}
        className="navigation__toggle"
      >
        <span className="navigation__toggle-icon">&nbsp;</span>
        {renderToggleNotification(amountOfWishItems + amountOfCartItems)}
      </button>
      <div ref={navRef} className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link to="/" data-tab="/" className="navigation__link active">
              <i className="fas fa-home"></i>
              <span className="navigation__link-name">Home</span>
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/products"
              data-tab="/products"
              className="navigation__link"
            >
              <i className="fas fa-tshirt"></i>
              <span className="navigation__link-name">Products</span>
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/transaction_history"
              data-tab="/transaction_history"
              className="navigation__link"
            >
              <i className="fas fa-history"></i>
              <span className="navigation__link-name">History</span>
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/wishlist"
              data-tab="/wishlist"
              className="navigation__link"
            >
              <i className="fas fa-heart"></i>
              <span className="navigation__link-name">Wishlist</span>
              {renderNotification(amountOfWishItems)}
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/shopping_cart"
              data-tab="/shopping_cart"
              className="navigation__link"
            >
              <i className="fas fa-shopping-cart"></i>
              <span className="navigation__link-name">Cart</span>
              {renderNotification(amountOfCartItems)}
            </Link>
          </li>
          {renderGoogleLogin()}
        </ul>
      </div>

      {/* <Loader /> */}
      {auth === null || products === null ? <Loader /> : ''}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
    amountOfWishItems: Object.values(state.wishlist).length,
    amountOfCartItems: Object.values(state.cart).reduce(
      (sum, currentItem) => sum + currentItem.amount,
      0
    ),
  };
};

export default connect(mapStateToProps)(withRouter(Navigation));
