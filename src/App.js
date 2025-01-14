import { useEffect, useState } from 'react';
import './App.css';
import video from './video-dish.mp4';
import image from './hot-soup.png';

import UserRecipesComponent from './UserRecipesComponent';
const cache = {};

function App() {
  const MY_ID = 'b60f7a6e'; 
  const MY_KEY = 'c189312473e5eede6b7834fa22e90d25'; 

  const [userSearch, setUserSearch] = useState('');
  const [userRecipes, setUserRecipes] = useState([]);
  const [firstWord, setFirstWord] = useState('banana');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getItem = async () => {
      if (cache[firstWord]) {
        setUserRecipes(cache[firstWord]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${firstWord}&app_id=${MY_ID}&app_key=${MY_KEY}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        cache[firstWord] = data.hits; 
        setUserRecipes(data.hits);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch recipes. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    getItem();
  }, [firstWord]); 

  const userRecipeSearch = (e) => {
    setUserSearch(e.target.value);
  };

  const finalSearch = (e) => {
    e.preventDefault();
    if (userSearch.trim() === '') {
      setError('Please enter a search term.');
      return;
    }
    setFirstWord(userSearch);
    setUserSearch(''); 
  };

  return (
    <div className="App">
      <div>
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>

      <div className="container">
        <h1>Find a recipe from the products you want to cook</h1>
      </div>

      <div className="container">
        <form onSubmit={finalSearch}>
          <input
            className="search"
            type="text"
            placeholder="Enter your products"
            onChange={userRecipeSearch}
            value={userSearch}
          />
          <button type="submit" className="search-button">
            <img src={image} width="45px" alt="search" />
          </button>
        </form>
      </div>

      <div className="container">
        {isLoading && <p>Loading recipes...</p>}
        {error && <p className="error">{error}</p>}
        {!isLoading && !error && userRecipes.length === 0 && (
          <p>No recipes found. Try a different search term.</p>
        )}
      </div>

      <div className="container">
        {userRecipes.map((element, index) => (
          <UserRecipesComponent
            key={index}
            label={element.recipe.label}
            image={element.recipe.image}
            ingredients={element.recipe.ingredientLines}
            calories={element.recipe.calories}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
