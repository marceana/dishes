import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, "Mínimo 5 caracteres")
      .max(15, "Máximo 15 caracteres")
      .required("Campo obrigatório"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("Campo Obrigatório"),
  });

  const onSubmit = async (data, { resetForm }) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:3001/auth", data);

      setSuccess("Conta criada com sucesso!");
      resetForm();
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 409) {
        setError("Usuário já existe");
      } else if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Erro ao registrar. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registrationPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange }) => (
          <Form className="formContainer">
            <h1 className="title">Registre-se no Dishes!</h1>

            <label htmlFor="username">Usuário: </label>

            <Field
              id="inputCreateRecipe"
              name="username"
              placeholder="Seu usuário"
              onChange={(e) => {
                handleChange(e);
                setError("");
                setSuccess("");
              }}
            />

            <ErrorMessage name="username" component="span" />

            <label htmlFor="password">Senha: </label>

            <Field
              id="inputCreateRecipe"
              name="password"
              placeholder="Sua senha"
              type="password"
              onChange={(e) => {
                handleChange(e);
                setError("");
                setSuccess("");
              }}
            />

            <ErrorMessage name="password" component="span" />

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrar-se"}
            </button>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Registration;
