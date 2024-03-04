import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data);
        navigate("/");
      }
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
