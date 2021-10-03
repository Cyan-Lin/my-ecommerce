import React, { useRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Navigation = ({ location, auth }) => {
  const { pathname } = location;

  const toggleRef = useRef(null);
  const navRef = useRef(null);

  // execpt logo link
  const navLinks = navRef.current?.querySelectorAll('.navigation__link');

  // trigger this everytime on pathname changing
  useEffect(() => {
    window.scrollTo(0, 0);
    navLinks?.forEach(navLink => {
      navLink.classList.remove('active');
      // add border-bottom
      if (navLink.dataset.tab === pathname) navLink.classList.add('active');
    });
  }, [pathname, navLinks]);

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

  const links = [
    { link: '/', active: 'active', i: 'fas fa-home', tabName: 'Home' },
    { link: '/products', active: '', i: 'fas fa-tshirt', tabName: 'Products' },
    {
      link: '/transaction_history',
      active: '',
      i: 'fas fa-history',
      tabName: 'History',
    },
    { link: '/wishlist', active: '', i: 'fas fa-heart', tabName: 'Wishlist' },
    {
      link: '/shopping_cart',
      active: '',
      i: 'fas fa-shopping-cart',
      tabName: 'Cart',
    },
  ];

  const renderLinks = () => {
    return links.map((link, i) => (
      <li key={i} className="navigation__item">
        <Link
          to={link.link}
          data-tab={link.link}
          className={`navigation__link ${link.active}`}
        >
          <i className={link.i}></i>
          <span>{link.tabName}</span>
        </Link>
      </li>
    ));
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

  return (
    <div className="navigation" onClick={onNavClick}>
      <div className="navigation__logo-box">
        <Link to="/" data-tab="/" className="navigation__logo-link">
          CyShop
        </Link>
      </div>
      <button
        ref={toggleRef}
        onClick={onToggleClick}
        className="navigation__toggle"
      >
        <span>&nbsp;</span>
      </button>
      <div ref={navRef} className="navigation__nav">
        <ul className="navigation__list">
          {renderLinks()}
          {renderGoogleLogin()}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(withRouter(Navigation));
