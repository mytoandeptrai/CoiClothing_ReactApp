import React, { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import formatCurrency from "../../util";

const ManageProduct = () => {
  const { products } = useContext(ProductContext);
  return (
    <div className="productManagement__wrapper--content">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>
                <div className="img">
                  <img src={product.image} alt={product.title} />
                </div>
              </td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{formatCurrency(product.price)}</td>
              <td>
                <ul>
                  <li>Edit</li>
                </ul>
              </td>
              <td>
                <ul>
                  <li>Delete</li>
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProduct;
