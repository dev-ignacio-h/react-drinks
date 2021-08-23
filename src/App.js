import Header from './components/Header';
import Form from './components/Form';

import CategoriasProvider from './context/CategoriesContext';
import RecipesProvider from './context/RecipesContext';
import RecipeList from './components/RecipeList';
import ModalProvider from './context/ModalContext';

function App() {
  return (
    <CategoriasProvider>
      <RecipesProvider>
        <ModalProvider>
          <Header />
          <div className="container mt-5">
            <div className="row">
              <Form />
            </div>
            <RecipeList />
          </div>
        </ModalProvider>
      </RecipesProvider>
    </CategoriasProvider>
  );
}

export default App;
