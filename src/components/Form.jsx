import { useContext, useState } from 'react';
import { CategoriesContext } from '../context/CategoriesContext';
import { RecipesContext } from '../context/RecipesContext';

const Form = () => {
  const [search, setSearch] = useState({
    name: '',
    category: ''
  });
  const { categories } = useContext(CategoriesContext);
  const { setSearchedRecipe, setConsult } = useContext(RecipesContext);

  const getDataRecipe = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form
      className="col-md-12"
      onSubmit={(e) => {
        e.preventDefault();
        setSearchedRecipe(search);
        setConsult(true);
      }}
    >
      <fieldset className="text-center">
        <legend>Search drinks by category or ingredient</legend>
      </fieldset>

      <div className="row mt-4">
        <div className="col-md-4">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Search by ingredient"
            onChange={getDataRecipe}
          />
        </div>

        <div className="col-md-4">
          <select
            name="category"
            className="form-control"
            onChange={getDataRecipe}
          >
            <option value="">-- Select category --</option>
            {categories.map((category) => (
              <option value={category.strCategory} key={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Search Drikns"
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
