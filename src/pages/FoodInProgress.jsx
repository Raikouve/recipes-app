import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import FavoriteButton from '../components/FavoriteButton';
import IngredientListProgress from '../components/IngredientListProgress';
// import recipesContext from '../context/recipesContext';
import Loading from '../components/Loading';
import ShareButton from '../components/ShareButton';
import mealId from '../mocks/mealId';

if (!localStorage.getItem('ingredientsInProgress')) {
  localStorage.setItem('ingredientsInProgress', JSON.stringify([]));
}

export default function FoodInProgress() {
  const [recipe, setRecipe] = useState(mealId.meals[0]);
  const [isFinished, setIsFinished] = useState(false);
  const [ingredientsLength, setIngredientsLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => () => {
    localStorage.removeItem('ingredientsInProgress');
  }, []);

  useEffect(() => {
    async function requestRecipe() {
      setIsLoading(true);
      const recipeURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const request = await fetch(recipeURL);
      const response = await request.json();
      console.log(response.meals);
      setRecipe(response.meals[0]);
      setIsLoading(false);
    }
    requestRecipe();
  }, [id]);

  // if (recipe !== undefined) {
  //   const arrayKeys = Object.keys(recipe);
  //   setIngredietValues(arrayKeys.filter((key) => key.includes('strIngredient')));
  // }

  if (isLoading) {
    return <Loading />;
  }
  // const arrayKeys = Object.keys(recipe);
  // setIngredietValues(arrayKeys.filter((key) => key.includes('strIngredient')));

  function checkProgress() {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const process = progress.meals[id].length;
    console.log(process);
    // console.log(process.length);
    return process === ingredientsLength ? setIsFinished(true) : null;
  }

  return (
    <section>
      { console.log(ingredientsLength) }
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb }
          alt={ recipe.strMealThumb }
        />
      </div>
      <div>
        <h3 data-testid="recipe-title">{ recipe.strMeal }</h3>
      </div>
      <div>
        <ShareButton dataTestId="share-btn" />
        <FavoriteButton favorite={ recipe } type="comida" />
      </div>
      <div>
        <span data-testid="recipe-category">{recipe.strCategory}</span>
      </div>
      <div>
        <IngredientListProgress
          ingredients={ recipe }
          tipo="meals"
          checkProgress={ checkProgress }
          setIngredientsLength={ setIngredientsLength }
          // setIsFinished={ setIsFinished }
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
