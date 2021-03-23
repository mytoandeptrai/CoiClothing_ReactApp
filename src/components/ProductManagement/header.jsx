import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <ul>
      <li>
        <Link to="/admin/productManagement/addProducts">Add Product </Link>
      </li>
    </ul>
  );
};

export default Header;
