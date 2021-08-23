import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecipesContext = createContext();

const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchedRecipe, setSearchedRecipe] = useState({
    name: '',
    category: ''
  });
  const [consult, setConsult] = useState(false);

  const { name, category } = searchedRecipe;

  useEffect(() => {
    if (consult) {
      const getRecipe = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}&c=${category}`;
        const result = await axios.get(url);
        console.log(result);
        setRecipes(result.data.drinks);
      };

      getRecipe();
    }
  }, [searchedRecipe, category, consult, name]);

  return (
    <RecipesContext.Provider value={{ recipes, setSearchedRecipe, setConsult }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
