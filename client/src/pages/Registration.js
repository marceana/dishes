import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("Campo Obrigatório"),
    password: Yup.string().min(4).required("Campo Obrigatório"),
  });

  const onSubmit = (data) => {
    console.log("CHAMOU ONSUBMIT");
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div className="registrationPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <h1 className="title">Registre-se no Dishes!</h1>
          <label htmlFor="user">Usuário: </label>
          <ErrorMessage name="user" component="span" />
          <Field
            id="inputCreateRecipe"
            name="username"
            placeholder="Seu usuário"
          />

          <label htmlFor="password">Senha: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputCreateRecipe"
            name="password"
            placeholder="Sua senha"
            type="password"
          />

          <button type="submit">Registrar-se</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
