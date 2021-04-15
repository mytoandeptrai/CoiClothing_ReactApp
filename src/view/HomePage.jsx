import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "../components/About";
import Admin from "../components/Admin";
import SignIn from "../components/Authentication/SignIn/SignIn";
import SignUp from "../components/Authentication/SignUp/SignUp";
import Cart from "../components/Cart";
import Checkout from "../components/CheckOut/Checkout";
import Contact from "../components/Contact";
import Header from "../components/Header";
import Home from "../components/Home";
import Proceed from "../components/Proceed";
import ProductDetails from "../components/Product/ProductDetails";
import Products from "../components/Product/Products";
import ProductContextProvider from "../contexts/ProductContext";
import "../css/HomePage.scss";
const HomePage = () => {
  return (
    <Fragment>
      <div className="grid-container">
        <ProductContextProvider>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/product">
                <Products />
              </Route>
              <Route exact path="/cart">
                <Cart />
              </Route>
              <Route exact path="/proceed">
                <Checkout />
              </Route>
              <Route exact path="/contact">
                <Contact />
              </Route>
              <Route exact path="/product/:id">
                <ProductDetails />
              </Route>
              <Route exact path="/admin">
                <Admin />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <SignIn />
              </Route>
              <Route exact path="/register">
                <SignUp />
              </Route>
            </Switch>
          </Router>
        </ProductContextProvider>
      </div>
    </Fragment>
  );
};

export default HomePage;
