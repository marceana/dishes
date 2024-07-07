import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = (props) => {
  return (
    <div className="pageNotFound">
      <h1>Página não encontrada :-(</h1>
      <h3>
        <Link to="/"> Ir para a home page</Link>
      </h3>
    </div>
  );
};

export default PageNotFound;
