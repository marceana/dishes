import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";

function App() {
  const [color, changeColor] = useState("#E5E6E1");
  return (
    <div className="App" style={{ background: color }}>
      <Router>
        <Link to="/createrecipe" onClick={() => changeColor("#9DBC98")}>
          Anotar uma receita
        </Link>
        <Link to="/" onClick={() => changeColor("#E5E6E1")}>
          Home
        </Link>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createrecipe" exact element={<CreateRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
