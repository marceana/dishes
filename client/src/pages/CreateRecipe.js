import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import API from "../api/axios";

function CreateRecipe() {
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const initialValues = {
    title: "",
    ingredients: [""],
    instructions: [""],
    image: "",
  };

  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    }
  }, [authState.status, navigate]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Campo obrigatório"),
    ingredients: Yup.array()
      .of(Yup.string().required("Campo obrigatório"))
      .min(1, "Adicione pelo menos um ingrediente"),
    instructions: Yup.array()
      .of(Yup.string().required("Campo obrigatório"))
      .min(1, "Adicione pelo menos uma instrução"),
    image: Yup.mixed()
      .required("Campo obrigatório")
      .test("fileType", "Formato inválido", (value) =>
        value instanceof File
          ? ["image/jpg", "image/png", "image/webp"].includes(value.type)
          : typeof value === "string"
      ),
  });

  const onSubmit = async (data, { setSubmitting }) => {
    setError("");
    setIsLoading(true);

    try {
      await API.post("/recipes", data);

      navigate("/");
    } catch (error) {
      console.error("Erro ao criar receita:", error);

      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Erro ao criar receita. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="createRecipePage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue }) => (
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
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.currentTarget.files[0];
                if (!file) return;

                const formData = new FormData();
                formData.append("file", file);
                formData.append(
                  "upload_preset",
                  process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
                );

                const res = await fetch(
                  `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                  { method: "POST", body: formData }
                );
                const data = await res.json();
                setFieldValue("image", data.secure_url); // just a URL string
              }}
            />

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar receita"}
            </button>

            {error && <p className="error">{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateRecipe;
