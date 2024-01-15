import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [listOfRecipes, setLisOfRecipes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/recipes").then(
      (response) => {
        setLisOfRecipes(response.data);
      },
      (err) => console.log(err)
    );
  }, []);
  return (
    <div className="App">
      {listOfRecipes.map((value, key) => {
        return (
          <div className="recipe">
            <div className="title">{value.title}</div>
            <img className="image" src={value.image} alt={value.title} />
            <div className="ingredients">
              {value.ingredients.map((value, key) => {
                return <div className="ingredient">{value}</div>;
              })}
            </div>
            <div className="instructions">
              {value.instructions.map((value, key) => {
                return <div className="instruction">{value}</div>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
