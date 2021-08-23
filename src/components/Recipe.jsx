import { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
  const top = 52;
  const left = 52;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 450,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: '90%',
    overflowY: 'auto'
  }
}));

const Recipe = ({ recipe }) => {
  // material ui settings
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
    setRecipeID(recipe.idDrink);
  };

  const handleClose = () => {
    setOpen(false);
    setRecipe({});
    setRecipeID(null);
  };

  const { infoRecipe, setRecipeID, setRecipe } = useContext(ModalContext);

  // show and format ingredients
  const showIngredients = (info) => {
    let ingredients = [];
    for (let i = 1; i < 16; i++) {
      if (info[`strIngredient${i}`]) {
        ingredients = [
          ...ingredients,
          <li key={`strIngredient${i}`}>
            {info[`strIngredient${i}`]} {info[`strMeasure${i}`]}
          </li>
        ];
      }
    }
    return ingredients;
  };
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{recipe.strDrink}</h2>
        <img
          src={recipe.strDrinkThumb}
          alt={recipe.strDrink}
          className="card-img"
        />

        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={handleOpen}
          >
            See Recipe
          </button>

          <Modal open={open} onClose={handleClose}>
            <div style={modalStyle} className={classes.paper}>
              <h2>{infoRecipe.strDrink}</h2>
              <h3 className="mt-4">Instructions</h3>
              <p>{infoRecipe.strInstructions}</p>
              <img
                className="img-fluid my-4"
                src={infoRecipe.strDrinkThumb}
                alt={infoRecipe.strDrink}
              />
              <h3>Ingredients and quantities</h3>
              <ul>{showIngredients(infoRecipe)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
