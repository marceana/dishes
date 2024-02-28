import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import Recipe from "./pages/Recipe";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
  const [color, changeColor] = useState("#E5E6E1");
  return (
    <div className="App" style={{ background: color }}>
      <Router>
        <div className="navbar">
          <Link to="/" onClick={() => changeColor("#E5E6E1")}>
            Home
          </Link>
          <Link to="/createrecipe" onClick={() => changeColor("#9DBC98")}>
            Anotar uma receita
          </Link>
          <Link to="/login" onClick={() => changeColor("#638889")}>
            Login
          </Link>
          <Link to="/registration" onClick={() => changeColor("#F9EFDB")}>
            Registrar-se
          </Link>
        </div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createrecipe" exact element={<CreateRecipe />} />
          <Route path="/recipe/:id" exact element={<Recipe />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/registration" exact element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
