import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfRecipes, setListOfRecipes] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/recipes", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(
        (response) => {
          setListOfRecipes(response.data);
        },
        (err) => console.log(err)
      );
  }, []);

  function getRandomColor() {
    const colors = ["#fabfb7", "#fdf9c4", "#ffda9e", "#c5c6c8", "#b2e2f2"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  return (
    <div className="recipesPage">
      {listOfRecipes.length > 0 ? (
        listOfRecipes.map((recipe, index) => {
          const backgroundColor = getRandomColor();
          return (
            <div
              className="recipe"
              key={index}
              style={{ backgroundColor }}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <div className="title">{recipe.title}</div>
              <img className="image" src={recipe.image} alt={recipe.title} />
            </div>
          );
        })
      ) : (
        <div className="noRecipes">
          Você ainda não possui receitas. <a href="#">Registre-se</a> ou{" "}
          <a href="#">faça login</a> para começar a adicionar.
        </div>
      )}
    </div>
  );
}

export default Home;
