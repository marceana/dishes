import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      console.log(response.data);
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
