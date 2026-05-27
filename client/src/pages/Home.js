import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import API from "../api/axios";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

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
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listOfRecipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/recipe/${recipe.id}`)}
          >
            <CardHeader className="relative">
              <CardTitle className="flex justify-between items-center pr-8">
                {recipe.title}
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteRecipe(recipe.id);
                  }}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img
                className="w-full h-48 object-cover rounded-lg"
                src={recipe.image}
                alt={recipe.title}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;
