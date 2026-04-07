import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import API from "../api/axios";

function Login() {
  const { setAuthState } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Usuário é obrigatório"),
    password: Yup.string().required("Senha é obrigatória"),
  });

  const onSubmit = async (data, { setSubmitting }) => {
    setError("");

    try {
      const response = await API.post("/auth/login", data);

      const { username, id } = response.data;

      setAuthState({
        username,
        id,
        status: true,
      });

      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.request) {
        setError("Servidor indisponível. Tente novamente.");
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="loginPage">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleChange }) => (
          <Form className="formContainer">
            <h1 className="title">Bem-vindo(a) de volta!</h1>

            <label>Usuário:</label>
            <Field
              id="inputLogin"
              name="username"
              placeholder="Usuário"
              disabled={isSubmitting}
              onFocus={() => setError("")}
            />
            <ErrorMessage name="username" component="span" />

            <label>Senha:</label>
            <Field
              id="inputLogin"
              name="password"
              type="password"
              placeholder="Senha"
              disabled={isSubmitting}
              onFocus={() => setError("")}
            />
            <ErrorMessage name="password" component="span" />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Carregando..." : "Login"}
            </button>

            {error && <p className="error">{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
