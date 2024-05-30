import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfRecipes, setListOfRecipes] = useState([]);
  let navigate = useNavigate();
  const hasAccessToken = localStorage.getItem("accessToken");

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

  const deleteRecipe = (id) => {
    axios
      .delete(`http://localhost:3001/recipes/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setListOfRecipes(
          listOfRecipes.filter((value) => {
            return value.id != id;
          })
        );
      });
  };

  function getRandomColor() {
    const colors = ["#fabfb7", "#fdf9c4", "#ffda9e", "#c5c6c8", "#b2e2f2"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  return (
    <div className="recipesPage">
      {listOfRecipes && listOfRecipes.length === 0 && hasAccessToken ? (
        <div className="noRecipes">
          Você ainda não possui receitas. <a href="#">Anote sua receita</a> para
          nunca mais esquecê-la!
        </div>
      ) : listOfRecipes && listOfRecipes.length > 0 && hasAccessToken ? (
        listOfRecipes.map((recipe, index) => {
          const backgroundColor = getRandomColor();
          return (
            <div
              className="recipe"
              key={index}
              style={{ backgroundColor }}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <div className="title">
                {recipe.title}{" "}
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteRecipe(recipe.id);
                  }}
                >
                  X
                </button>
              </div>
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
