import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "../components/Admin";
import Cart from "../components/Cart";
import Header from "../components/Header";
import Home from "../components/Home";
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
              <Route exact path="/product/:id">
                <ProductDetails />
              </Route>
              <Route exact path="/admin">
                <Admin />
              </Route>
            </Switch>
          </Router>
        </ProductContextProvider>
      </div>
    </Fragment>
  );
};

export default HomePage;
