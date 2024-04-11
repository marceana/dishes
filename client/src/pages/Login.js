import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        const { accessToken } = response.data;
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);

          navigate("/");
        } else {
          alert("Token de acesso não recebido do servidor.");
        }
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login. Por favor, tente novamente mais tarde.");
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
        />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;
