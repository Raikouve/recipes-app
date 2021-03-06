import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import IngredientListProgress from '../components/IngredientListProgress';
// import recipesContext from '../context/recipesContext';
import Loading from '../components/Loading';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

export default function DrinksInProgress() {
  const [recipe, setRecipe] = useState();
  const [isFinished, setIsFinished] = useState(false);
  const [ingredientsLength, setIngredientsLength] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    async function requestRecipe() {
      const recipeURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const request = await fetch(recipeURL);
      const response = await request.json();
      console.log(response.drinks[0]);
      setRecipe(response.drinks[0]);
    }
    requestRecipe();
  }, [id]);

  if (!recipe) {
    return <Loading />;
  }

  function checkProgress() {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const process = progress.cocktails[id].length;
    console.log(process);
    console.log(process.length);
    return process === ingredientsLength ? setIsFinished(true) : null;
  }

  return (
    <section>
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipe.strDrinkThumb }
          alt={ recipe.strDrinkThumb }
        />
      </div>
      <div>
        <h3 data-testid="recipe-title">{ recipe.strDrink }</h3>
      </div>
      <div>
        <span>{ recipe.strAlcoholic }</span>
      </div>
      <div>
        <ShareButton dataTestId="share-btn" />
        <FavoriteButton favorite={ recipe } type="bebida" />
      </div>
      <div>
        <span data-testid="recipe-category">{recipe.strCategory}</span>
      </div>
      <div>
        <IngredientListProgress
          ingredients={ recipe }
          checkProgress={ checkProgress }
          setIngredientsLength={ setIngredientsLength }
          tipo="cocktails"
        />
      </div>
      <div>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
      </div>
      <div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ !isFinished }
        >
          Finalizar receita
        </button>
      </div>
    </section>
  );
}
