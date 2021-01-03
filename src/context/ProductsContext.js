import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "../components/fetchData";
const ProductsContext = createContext({});

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData("projects")
      .then((res) => setProducts(res))
      .catch((error) => console.log(error));
  }, []);
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProductsContext = () => useContext(ProductsContext);
export default useProductsContext;
