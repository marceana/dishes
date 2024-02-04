import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    ingredients: [""],
    instructions: [""],
    image: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Campo obrigatório"),
    ingredients: Yup.array().of(Yup.string().required("Campo obrigatório")),
    instructions: Yup.array().of(Yup.string().required("Campo obrigatório")),
    image: Yup.string().required("Campo obrigatório e deve ser uma url!"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/recipes", data).then((response) => {
      navigate("/");
    });
  };

  return (
    <div className="createRecipePage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="formContainer">
            <h1 className="title">Guarde sua receita!</h1>
            <label htmlFor="title">Nome da receita: </label>
            <ErrorMessage name="title" component="span" />
            <Field
              id="inputCreateRecipe"
              name="title"
              placeholder="Nome da receita"
            />

            <label htmlFor="ingredients">Ingredientes: </label>
            <ErrorMessage name="ingredients" component="span" />
            <FieldArray name="ingredients">
              {({ push, remove }) => (
                <div>
                  {values.ingredients.map((ingredient, index) => (
                    <div key={index}>
                      <Field
                        id="inputCreateRecipe"
                        name={`ingredients.${index}`}
                        placeholder="Ingrediente"
                      />
                      {index > 0 && (
                        <button
                          id="inputDelete"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          x
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => push("")}>
                    Adicionar Ingrediente
                  </button>
                </div>
              )}
            </FieldArray>

            <label htmlFor="instructions">Instruções: </label>
            <ErrorMessage name="instructions" component="span" />
            <FieldArray id="inputCreateRecipe" name="instructions">
              {({ push, remove }) => (
                <div>
                  {values.instructions.map((instruction, index) => (
                    <div key={index}>
                      <Field
                        id="inputCreateRecipe"
                        name={`instructions.${index}`}
                        placeholder="Instrução"
                      />
                      {index > 0 && (
                        <button
                          id="inputDelete"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          x
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => push("")}>
                    Adicionar Instrução
                  </button>
                </div>
              )}
            </FieldArray>

            <label htmlFor="image">Imagem: </label>
            <ErrorMessage name="image" component="span" />
            <Field
              id="inputCreateRecipe"
              name="image"
              placeholder="Imagem da receita"
            />

            <button type="submit" onSubmit={onSubmit}>
              Enviar receita
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateRecipe;
