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
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
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
          setAuthState({
            ...authState,
            status: false,
          });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <div className="App" style={{ background: color }}>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to="/" onClick={() => changeColor("#E5E6E1")}>
              Home
            </Link>
            {authState.status && (
              <>
                <Link to="/createrecipe" onClick={() => changeColor("#9DBC98")}>
                  Anotar uma receita
                </Link>
                <Link onClick={logout}>Logout</Link>
                <h1>{authState.username}</h1>
              </>
            )}
            {!authState.status && (
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
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
