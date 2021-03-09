import React from "react";

const ProductSize = ({ availableSizes }) => {
  return (
    <div className="availableSizes__Color">
      {availableSizes.map((size, index) => (
        <>
           <button key={index}>{size}</button>
        </>
      ))}
    </div>
  );
};

export default ProductSize;
