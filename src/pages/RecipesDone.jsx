import React from 'react';
import Header from '../components/Header';

export default function RecipesDone() {
  return (
    <section>
      <Header title="Receitas Feitas" searchButton={ false } />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
    </section>
  );
}
