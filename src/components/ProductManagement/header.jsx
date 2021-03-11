import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
const Header = () => {
  return (
    <button>
      <Link to="/admin/productManagement/addProducts">Add Product </Link>
    </button>
  );
};

export default Header;
