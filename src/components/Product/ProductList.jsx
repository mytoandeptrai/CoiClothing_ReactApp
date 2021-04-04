import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import "../../css/ProductList.scss";
import formatCurrency from "../../util";
import Fade from "react-reveal/Fade";
import { Result, Button } from "antd";
import ReactPaginate from "react-paginate";
import "../../css/Pagination.scss";
const ProductList = ({ products }) => {
  const { handleAddToCart } = useContext(ProductContext);
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 10;
  const pageVisited = pageNumber * productPerPage;
  const displayProducts = products
    .slice(pageVisited, pageVisited + productPerPage)
    .map((product) => (
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
            <button onClick={() => handleAddToCart(product)}>
              Add to cart
            </button>
          </div>
        </div>
      </li>
    ));
  const pageCount = Math.ceil(products.length / productPerPage);
  const changePage = ({ selected }) => {
    console.log(selected);
    setPageNumber(selected);
  };
  return (
    <>
      {products ? (
        <Fade bottom cascade={true}>
          <div className="product__list-container">
            <ul className="products__list">{displayProducts}</ul>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination"}
              previousLinkClassName={"previousBtn"}
              nextLinkClassName={"nextBtn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </Fade>
      ) : (
        <>
          <Result
            status="warning"
            title="There are some problems with your operation."
            extra={
              <Button type="primary" key="console">
                Go Console
              </Button>
            }
          />
          ,
        </>
      )}
    </>
  );
};

export default ProductList;
