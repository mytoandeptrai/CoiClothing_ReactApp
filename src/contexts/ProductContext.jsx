import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import data from "../data/data.json";
import formatNumber from "../util2";
import fire from "../firebase/config/index";
export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  //state
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  const productFilter = (value) => {
    return value.filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
    });
  };
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };
  useEffect(() => {
    getProducts();
    console.log("dang changed");
  }, []);

  useEffect(() => {
    authListener();
    return () => {
      setUser("");
    };
  }, []);

  const handleAddClick = (productValue) => {
    console.log(productValue);
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
  const handleRemoveProductFromAdmin = async (id) => {
    try {
      // await axios.delete(`http://localhost:3000/products/${id}`);
      const productValue = products.filter((product) => product._id !== id);
      setProducts(productValue);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleClearAll = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };
  const handleRemoveProduct = (id) => {
    const currentProduct = cartItems.find((x) => x._id === id);
    const cartValue = [...cartItems];
    if (currentProduct) {
      setCartItems(cartValue.filter((item) => item._id !== id));
    }
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartValue.filter((item) => item._id !== id))
    );
  };
  const handleAddToCart = (productValue) => {
    const cartValues = [...cartItems];
    const alreadyInCart = cartItems.every((item) => {
      return item._id !== productValue._id;
    });
    if (alreadyInCart) {
      cartValues.push({
        ...productValue,
        count: 1,
        size: "L",
      });
    } else {
      const cartName = cartItems.filter(
        (item) => item._id === productValue._id
      );
      console.log("cartName", cartName);
      alert(cartName[0].title + " has been in your cart!");
    }
    setCartItems(cartValues);
    localStorage.setItem("cartItems", JSON.stringify(cartValues));
  };
  const handleAddToCartFromDetails = (productValue) => {
    if (productValue.count === 0) {
      alert("You have to enter your number of product");
    } else if (productValue.size === "") {
      alert("You have to choose your size of product before adding to cart");
    } else {
      const currentCartItem = products.filter(
        (x) => x._id === productValue._id
      );
      const cartValues = [...cartItems];
      const alreadyInCart = cartItems.every((item) => {
        return item._id !== productValue._id;
      });
      const newCartItem = {
        ...currentCartItem[0],
        ...productValue,
        count: formatNumber(productValue.count),
      };
      if (alreadyInCart) {
        cartValues.push(newCartItem);
      } else {
        const cartName = cartItems.map((item) => item.title);
        alert(cartName + " has been in your cart!");
      }
      setCartItems(cartValues);
    }
  };

  const handleFilterProducts = (product) => {
    setProducts(product);
  };
  const handleSortProducts = (event) => {
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
  const handleSortCategory = (event) => {
    const categoryValue = event.target.value;
    const productsFromDb = [...products];
    if (categoryValue === "") {
      return;
    } else if (categoryValue === "All") {
      setCategory(categoryValue);
      setProducts(productsFromDb);
    } else if (categoryValue === "Trousers") {
      setCategory(categoryValue);
      setProducts(
        data.products.filter((product) => product.category === categoryValue)
      );
    } else if (categoryValue === "Coats") {
      setCategory(categoryValue);
      setProducts(
        data.products.filter((product) => product.category === categoryValue)
      );
    } else if (categoryValue === "T-Shirts") {
      setCategory(categoryValue);
      setProducts(
        data.products.filter((product) => product.category === categoryValue)
      );
    } else {
      setCategory(categoryValue);
      setProducts(
        data.products.filter((product) => product.category === categoryValue)
      );
    }
  };
  const handleSearchSubmit = (search) => {
    setSearchTerm(search);
  };

  const productContextData = {
    products,
    size,
    setSize,
    sort,
    category,
    cartItems,
    user,
    productFilter,
    totalPrice,
    setTotalPrice,
    handleSortProducts,
    handleFilterProducts,
    handleSortCategory,
    handleAddToCart,
    handleAddToCartFromDetails,
    handleAddClick,
    handleRemoveClick,
    handleRemoveProduct,
    handleSearchSubmit,
    handleRemoveProductFromAdmin,
    handleClearAll,
  };
  return (
    <ProductContext.Provider value={productContextData}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
