import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import { ProductContext } from "../../contexts/ProductContext";
import "../../css/Header.scss";
import Menu from "../../svg/bars-solid.svg";
import Close from "../../svg/times-solid.svg";
import fire from "../../firebase/config/index";
const Header = () => {
  const { cartItems, user } = useContext(ProductContext);
  const history = useHistory();
  const handleLogout = () => {
    fire.auth().signOut();
  };

  const handleMovingCart = () => {
    if (user) {
      history.push("/cart");
    } else {
      alert("You must to login to do that");
    }
  };
  return (
    <header>
      <div className="header__menu">
        <img src={Menu} alt="pic1" width="20" />
      </div>
      <div className="header__logo">
        <h1>
          <Link to="/product">
            <img src={logo} alt={logo} width="100" />
          </Link>
        </h1>
      </div>
      <nav className="header__navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/product">Products</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {user ? (
            <>
              <li>
                <p>Hello Em </p>
              </li>
              <li onClick={handleLogout}>
                <p>Logout</p>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login / Register</Link>
            </li>
          )}

          <li className="header__nav--close">
            <img src={Close} alt="pic2" width="20" />
          </li>
        </ul>
        <div className="header__nav--cart" onClick={handleMovingCart}>
          <span>{cartItems.length}</span>
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/shopping-cart.png"
            alt="pic3"
            width="20"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
