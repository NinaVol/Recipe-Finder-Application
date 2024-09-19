import { useEffect, useState } from 'react';
import './App.css';
import video from './video-dish.mp4';
import image from './hot-soup.png'

import UserRecipesComponent from './UserRecipesComponent';


function App() {
  const MY_ID = 'b60f7a6e';
  const MY_KEY = 'c189312473e5eede6b7834fa22e90d25';

  const [userSerch, setUserSearch] = useState('');
  const [userRecipes, setUserRecipes] = useState([]);
  const [firstWord, setFirstWord] = useState('banana')

  useEffect(() => {
    const getItem = async () => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${firstWord}&app_id=${MY_ID}&app_key=${MY_KEY}`);
      const data = await response.json()
      setUserRecipes(data.hits);  
    }
    getItem()
  },[firstWord]) 

  const userRecipeSearch= (e) => {
    setUserSearch(e.target.value);
  }

  const finalSearch = (e) => {
     e.preventDefault();
     setFirstWord(userSerch)
  }


  return (
    <div className="App">
      <div>
        <video autoPlay muted loop>
          <source src={video} type='video/mp4'/>
        </video>
      </div>


      <div className='container'>
         <h1>Find a recipe from the products you want to cook</h1>
      </div>

      <div className='container'>
        <form onSubmit={finalSearch}>
           <input className='search' type='text' placeholder='Enter your products' onChange={userRecipeSearch} value={userSerch}/>
        </form>
      </div>

      <div className='container'>
        <button onClick={finalSearch}>
           <img src={image} width='45px' alt='search'/>
        </button>
      </div>
       

       {userRecipes.map((element, index) => (
         <UserRecipesComponent key={index}
         label={element.recipe.label} 
         image={element.recipe.image}
         ingredients={element.recipe.ingredientLines}
         calories={element.recipe.calories}/>
       ))}


      
    </div>
  );
}

export default App;



