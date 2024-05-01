import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import Recipe from "./pages/Recipe";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(false);
  const [color, changeColor] = useState("#E5E6E1");

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/isAuthenticated", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState(false);
  };

  return (
    <div className="App" style={{ background: color }}>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to="/" onClick={() => changeColor("#E5E6E1")}>
              Home
            </Link>
            {authState && (
              <>
                <Link to="/createrecipe" onClick={() => changeColor("#9DBC98")}>
                  Anotar uma receita
                </Link>
                <Link onClick={logout}>Logout</Link>
              </>
            )}
            {!authState && (
              <>
                <Link to="/login" onClick={() => changeColor("#638889")}>
                  Login
                </Link>
                <Link to="/registration" onClick={() => changeColor("#F9EFDB")}>
                  Registrar-se
                </Link>
              </>
            )}
          </div>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/createrecipe" exact element={<CreateRecipe />} />
            <Route path="/recipe/:id" exact element={<Recipe />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/registration" exact element={<Registration />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
