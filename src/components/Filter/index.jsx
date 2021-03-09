import React, { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import "../../css/Filter.scss";
const Filter = () => {
  const {
    products,
    size,
    sort,
    handleFilterProducts,
    handleSortProducts,
  } = useContext(ProductContext);
  return (
    <div className="filter__content">
      <div className="filter__content--result">
        {products.length} Products were found
      </div>
      <div className="filter__content--sort" >
        Order{" "}
        <select value={sort} onChange={handleSortProducts}>
          <option value="Latest">Latest</option>
          <option value="Lowest">Lowest</option>
          <option value="Highest">Highest</option>
        </select>
      </div>
      <div className="filter__content--size">
        Filter{" "}
        <select value={size} onChange={handleFilterProducts}>
          <option value="All">All</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
