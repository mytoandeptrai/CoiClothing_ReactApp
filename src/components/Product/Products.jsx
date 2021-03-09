import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../../css/Products.scss";
import Filter from "../Filter";
import ProductList from "./ProductList";
const Products = () => {
  return (
    <main>
      <Filter />
      <div className="product__container">
        <ProductList />
      </div>
    </main>
  );
};

export default Products;
