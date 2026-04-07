import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import API from "../api/axios";

function Home() {
  const [listOfRecipes, setListOfRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    }
  }, [authState.status, navigate]);

  useEffect(() => {
    if (!authState.status) return;

    fetchRecipes();
  }, [authState.status]);

  const fetchRecipes = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await API.get("/recipes");
      setListOfRecipes(response.data);
    } catch (err) {
      setError("Erro ao carregar receitas.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await API.delete(`/recipes/${id}`);

      setListOfRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

  function getRandomColor() {
    const colors = ["#fabfb7", "#fdf9c4", "#ffda9e", "#c5c6c8", "#b2e2f2"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  if (isLoading) return <p>Carregando receitas...</p>;

  if (error) return <p className="error">{error}</p>;

  if (!authState.status) {
    return (
      <div className="recipesPage">
        <div className="noRecipes">
          Você ainda não possui receitas.{" "}
          <span onClick={() => navigate("/register")}>Registre-se</span> ou{" "}
          <span onClick={() => navigate("/login")}>faça login</span> para
          começar a adicionar.
        </div>
      </div>
    );
  }

  if (listOfRecipes.length === 0) {
    return (
      <div className="recipesPage">
        <div className="noRecipes">
          Você ainda não possui receitas.{" "}
          <span onClick={() => navigate("/createrecipe")}>
            Anote sua receita
          </span>{" "}
          para nunca mais esquecê-la!
        </div>
      </div>
    );
  }

  return (
    <div className="recipesPage">
      {listOfRecipes.map((recipe) => (
        <div
          className="recipe"
          key={recipe.id}
          style={{ backgroundColor: colors[recipe.id % colors.length] }}
          onClick={() => navigate(`/recipe/${recipe.id}`)}
        >
          <div className="title">
            {recipe.title}
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
      ))}
    </div>
  );
}

export default Home;
