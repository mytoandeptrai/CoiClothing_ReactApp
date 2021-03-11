import React from "react";

const ManageProduct = () => {
  return (
    <div className="productManagement__wrapper--content">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>ádc</td>
            <td>Lorem ipsum dolor sit amet consectetur 3123.</td>
            <td>Awa</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageProduct;
