import React, { Component } from "react";
import api from "../../services/api";
import "./styles.css";

export default class Product extends Component {
  state = {
    product: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const { data } = await api.get(`/products/${id}`);
    this.setState({ product: data });
  }

  render() {
    const { product } = this.state;

    return (
      <div className="product">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <a href="/">Voltar</a>
      </div>
    );
  }
}