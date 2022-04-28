import React, { useState, useEffect } from 'react';
import PropTypes, { any } from 'prop-types';

export default function Checkbox({ id, checkProgress, ingredient, tipo }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleChange() {
    // localStorage
    //   .setItem('ingredientsInProgress', JSON
    //     .stringify([...JSON.parse(localStorage.getItem('ingredientsInProgress')), id]));
    // checkProgress();
    const obtProgress = localStorage.getItem('inProgressRecipes');
    const stringProgress = JSON.parse(obtProgress);
    if (!isChecked) {
      setIsChecked(true);
      if (tipo === 'meals') {
        const objMeals = stringProgress.meals[ingredient.idMeal];
        objMeals.push(ingredient[id]);
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...stringProgress,
          meals: {
            ...stringProgress.meals, [ingredient.idMeal]: [...objMeals] } }));
      }
      if (tipo === 'cocktails') {
        const objDrink = stringProgress.cocktails[ingredient.idDrink];
        objDrink.push(ingredient[id]);
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...stringProgress,
          cocktails: {
            ...stringProgress.cocktails, [ingredient.idDrink]: [...objDrink] } }));
      }
      checkProgress();
    } else {
      setIsChecked(false);
      if (tipo === 'meals') {
        const objMeals = stringProgress.meals[ingredient.idMeal];
        objMeals.splice(objMeals.indexOf(ingredient[id]), 1);
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...stringProgress,
          meals: {
            ...stringProgress.meals, [ingredient.idMeal]: [...objMeals] } }));
      }
      if (tipo === 'cocktails') {
        const objDrink = stringProgress.cocktails[ingredient.idDrink];
        objDrink.splice(objDrink.indexOf(ingredient[id]), 1);
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...stringProgress,
          cocktails: {
            ...stringProgress.cocktails, [ingredient.idDrink]: [...objDrink] } }));
      }
      checkProgress();
    }
  }

  // else {
  //   setIsChecked(false);
  //   localStorage
  //     .setItem('ingredientsInProgress', JSON
  //       .stringify(JSON
  //         .parse(localStorage.getItem('ingredientsInProgress'))
  //         .filter((item) => item !== id)));
  // }

  useEffect(() => {
    if (tipo === 'meals' && JSON.parse(localStorage
      .getItem('inProgressRecipes')).meals[ingredient.idMeal]
      .includes(ingredient[id])) {
      setIsChecked(true);
    }
    if (tipo === 'cocktails' && JSON.parse(localStorage
      .getItem('inProgressRecipes')).cocktails[ingredient.idDrink]
      .includes(ingredient[id])) {
      setIsChecked(true);
    }
  }, []);

  return (
    <input
      type="checkbox"
      id={ id }
      name={ id }
      checked={ isChecked }
      onChange={ () => handleChange() }
    />
  );
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  checkProgress: PropTypes.func.isRequired,
  ingredient: PropTypes.shape(Object(any)).isRequired,
  tipo: PropTypes.string.isRequired,
};
