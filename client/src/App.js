import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import Recipe from "./pages/Recipe";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import PageNotFound from "./pages/PageNotFound";
import API from "./api/axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  const [color, changeColor] = useState("#E5E6E1");

  useEffect(() => {
    API.get("/auth/isAuthenticated", {
      withCredentials: true,
    }).then((response) => {
      if (response.data.error) {
        setAuthState((prev) => ({
          ...prev,
          status: false,
        }));
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, []);

  const logout = async () => {
    await API.post("/auth/logout");

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
            {authState.status && (
              <>
                <Link to="/" onClick={() => changeColor("#E5E6E1")}>
                  Home
                </Link>
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
