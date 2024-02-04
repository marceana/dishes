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
      <div className="title">{recipeObject.title}</div>
      <img className="image" src={recipeObject.image} alt="recipe" />
      <div className="ingredients">{recipeObject.ingredients}</div>
      <div className="instructions">{recipeObject.instructions}</div>
    </div>
  );
}

export default Recipe;
