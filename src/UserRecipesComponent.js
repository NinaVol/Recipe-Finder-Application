import gloves from './gloves.png'

function UserRecipesComponent({label,image,ingredients, calories}) {
 return(
    <div>
        <div className="container">
          <h2>{label}</h2>
        </div>
        <div className="container">
          <img src={image} alt='dish'/>
        </div>
        <div className="container">         
           <ul>
            {ingredients.map((ingredient, index) => (
                <li key={index}>
                    <img src={gloves} alt='glove' width='30px'/>
                    {ingredient}
                </li>
            ))}
           </ul>

        </div>
        <div className="container">
          <p>{calories.toFixed()} calories</p>
        </div>
        
        
     
       
        

    </div>
 )
}
export default UserRecipesComponent;