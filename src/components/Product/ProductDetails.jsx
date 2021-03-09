import React, { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ProductSize from "./ProductSize";
import formatCurrency from "../../util";
import "../../css/ProductDetails.scss";
const ProductDetails = () => {
  const { products, handleAddToCart } = useContext(ProductContext);
  const { id } = useParams();
  console.log(id);
  const newProducts = products.filter((newProduct) => newProduct._id === id);
  return (
    <>
      {newProducts.map((item) => (
        <div className="product__details" key={item._id}>
          <img src={item.image} alt={item.image} />
          <div className="product__details--content">
            <div className="product__content--above">
              <h2>{item.title}</h2>
              <span>{formatCurrency(item.price)}</span>
            </div>
            <div className="product__content--below">
              AvailableSizes:{" "}
              <ProductSize availableSizes={item.availableSizes} />
              <p>Category: {item.category}</p>
              <p>Description: {item.description}</p>
              <div className="product__below--btn">
                <Link to="/product">Continue Shopping</Link>
                <Link
                  to="/product"
                  className="cart"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
