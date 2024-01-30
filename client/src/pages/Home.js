import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [listOfRecipes, setLisOfRecipes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/recipes").then(
      (response) => {
        setLisOfRecipes(response.data);
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
    <div className="recipePage">
      {listOfRecipes.map((value, index) => {
        const backgroundColor = getRandomColor();
        return (
          <div className="recipe" key={index} style={{ backgroundColor }}>
            <div className="title">{value.title}</div>
            <img className="image" src={value.image} alt={value.title} />
            {/* <div className="ingredients">
              {value.ingredients.map((value, key) => {
                return <div className="ingredient">{value}</div>;
              })}
            </div>
            <div className="instructions">
              {value.instructions.map((value, key) => {
                return <div className="instruction">{value}</div>;
              })}
            </div> */}
          </div>
        );
      })}
    </div>
  );
}

export default Home;
