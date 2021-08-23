import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

// create context
export const CategoriesContext = createContext();

// Provider is where the functions and state are
const CategoriesProvider = ({ children }) => {
  // create Context state
  const [categories, setCategories] = useState([]);
  // call api
  useEffect(() => {
    const getCategories = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const categories = await axios.get(url);
      setCategories(categories.data.drinks);
    };
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
