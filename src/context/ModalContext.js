import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// create context
export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  // provider state
  const [recipeID, setRecipeID] = useState(null);
  const [infoRecipe, setRecipe] = useState({});

  useEffect(() => {
    const getRecipe = async () => {
      if (!recipeID) return;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`;
      const result = await axios.get(url);

      setRecipe(result.data.drinks[0]);
    };

    getRecipe();
  }, [recipeID]);

  return (
    <div>
      <ModalContext.Provider
        value={{
          infoRecipe,
          setRecipeID,
          setRecipe
        }}
      >
        {children}
      </ModalContext.Provider>
    </div>
  );
};

export default ModalProvider;
