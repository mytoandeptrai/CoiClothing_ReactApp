import React, { createContext, useState, useEffect } from "react";
import data from "../data/data.json";
import axios from "axios";
export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  //state
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  // useEffect(() => {
  //   getProducts();
  // }, []);
  const handleAddClick = (productValue) => {
    const currentProduct = cartItems.find((x) => x._id === productValue._id);
    if (currentProduct) {
      setCartItems(
        cartItems.map((item) => {
          return item._id === productValue._id
            ? { ...currentProduct, count: currentProduct.count + 1 }
            : item;
        })
      );
    }
  };
  const handleRemoveClick = (productValue) => {
    const currentProduct = cartItems.find((x) => x._id === productValue._id);
    if (currentProduct.count === 1) {
      setCartItems(
        cartItems.map((item) => {
          return item._id === productValue._id
            ? { ...currentProduct, count: 1 }
            : item;
        })
      );
    } else {
      setCartItems(
        cartItems.map((item) => {
          return item._id === productValue._id
            ? { ...currentProduct, count: currentProduct.count - 1 }
            : item;
        })
      );
    }
  };
  const handleRemoveProduct = id => {
    const currentProduct = cartItems.find((x) => x._id === id);
    const cartValue = [...cartItems]
    if(currentProduct){
      setCartItems(
        cartValue.filter(item => item._id !== id)
      );
    }
  }
  const handleAddToCart = (productValue) => {
    const cartValues = [...cartItems];
    const alreadyInCart = cartItems.every((item) => {
      return item._id !== productValue._id;
    });
    if (alreadyInCart) {
      cartValues.push({
        ...productValue,
        count: 1,
      });
    } else {
      const cartName = cartItems.map((item) => item.title);
      alert(cartName + " has been in your cart!");
    }
    setCartItems(cartValues);
  };
  const handleFilterProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      return;
    } else if (event.target.value === "All") {
      setSize(event.target.value);
      setProducts(data.products);
    } else {
      setSize(event.target.value);
      setProducts(
        data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        )
      );
    }
  };
  const handleSortProducts = (event) => {
    console.log(event.target.value);
    const sortValue = event.target.value;
    setSort(sortValue);
    const newProductList = [...products];
    newProductList.sort((a, b) =>
      sort === "Lowest"
        ? a.price < b.price
          ? 1
          : -1
        : sort === "Highest"
        ? a.price > b.price
          ? 1
          : -1
        : a._id < b._id
        ? 1
        : -1
    );
    setProducts(newProductList);
  };
  console.log(products);
  const productContextData = {
    products,
    size,
    sort,
    cartItems,
    handleSortProducts,
    handleFilterProducts,
    handleAddToCart,
    handleAddClick,
    handleRemoveClick,
    handleRemoveProduct
  };
  return (
    <ProductContext.Provider value={productContextData}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
