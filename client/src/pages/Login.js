import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    setIsLoading(true);
    const data = { username: username, password: password };

    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        const { accessToken } = response.data;

        if (accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });

          navigate("/");
        } else {
          alert("Token de acesso não recebido do servidor.");
        }
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login. Por favor, tente novamente mais tarde.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="loginPage">
      <div className="formContainer">
        <h1 className="title">Bem-vindo(a) de volta!</h1>

        <label htmlFor="user">Usuário: </label>

        <input
          type="text"
          name="username"
          id="inputLogin"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="Usuário"
          disabled={isLoading}
        />

        <label htmlFor="password">Senha: </label>

        <input
          type="password"
          name="password"
          id="inputLogin"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Senha"
          disabled={isLoading}
        />

        <button onClick={login} disabled={isLoading}>
          {isLoading ? "Carregando..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
