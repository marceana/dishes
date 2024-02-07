import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Recipe() {
  let { id } = useParams();
  const [recipeObject, setRecipeObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/recipes/byId/${id}`).then((response) => {
      setRecipeObject(response.data);
    });
  });
  return (
    <div className="recipePage">
      <div className="recipeTitle">{recipeObject.title}</div>
      <img className="recipeImage" src={recipeObject.image} alt="recipe" />
      <div className="recipeIngredientsTitle">Ingredientes:</div>
      <div className="recipeIngredients">
        {recipeObject.ingredients &&
          recipeObject.ingredients.map((value, key) => {
            return (
              <div key={key}>
                {key + 1}. {value}
              </div>
            );
          })}
      </div>
      <span className="recipeInstructionsTitle">Instruções:</span>
      <div className="recipeInstructions">
        {recipeObject.instructions &&
          recipeObject.instructions.map((value, key) => {
            return (
              <div key={key}>
                {key + 1}. {value}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Recipe;
