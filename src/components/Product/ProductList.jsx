import React, { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { Link } from "react-router-dom";
import formatCurrency from "../../util";
import "../../css/ProductList.scss";
const ProductList = () => {
  const { products,handleAddToCart } = useContext(ProductContext);
  return (
    <div>
      <ul className="products__list">
        {products.map((product) => (
          <li key={product._id}>
            <div className="products__item">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.src} />
              </Link>
              <div className="products__item--content">
                <h3>
                  <Link to={`/product/${product._id}`}>{product.title}</Link>
                </h3>
                <div className="products__content--price">
                  <span>{formatCurrency(product.price)}</span>
                  <p>{formatCurrency(product.discount)}</p>
                </div>
                <button onClick={() => handleAddToCart(product)}>Add to cart</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
