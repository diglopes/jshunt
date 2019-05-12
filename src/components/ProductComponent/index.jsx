import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default props => (
  <article key={props.product._id} className="productComponent">
    <h2>{props.product.title}</h2>
    <p>{props.product.description}</p>

    <Link to={`/products/${props.product._id}`}>Acessar</Link>
  </article>
);
