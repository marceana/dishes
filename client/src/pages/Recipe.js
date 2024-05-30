import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Recipe() {
  let { id } = useParams();
  const [recipeObject, setRecipeObject] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/recipes/byId/${id}`).then((response) => {
      setRecipeObject(response.data);
    });
  });

  const deleteRecipe = (id) => {
    axios
      .delete(`http://localhost:3001/recipes/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setRecipeObject({});
      });
  };

  return (
    <div className="recipePage">
      <div className="recipeTitle">{recipeObject.title}</div>
      <img className="recipeImage" src={recipeObject.image} alt="recipe" />
      <div className="recipeIngredientsTitle">Ingredientes:</div>
      <div className="recipeIngredients">
        {recipeObject.ingredients &&
          recipeObject.ingredients.map((value, key) => {
            if (recipeObject.length < 0) {
              return null;
            } else {
              return (
                <div key={key}>
                  {key + 1}. {value}
                </div>
              );
            }
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
      <button
        onClick={(event) => {
          event.stopPropagation();
          deleteRecipe(id);
          navigate("/");
        }}
      >
        Apagar receita
      </button>
    </div>
  );
}

export default Recipe;
