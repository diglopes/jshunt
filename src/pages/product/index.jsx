import React, { Component } from "react";
import api from "../../services/api";
import Loading from "../../components/LoadingComponent";

import "./styles.css";

export default class Product extends Component {
  state = {
    product: {},
    loading: true
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const { data } = await api.get(`/products/${id}`);
    this.setState({ product: data, loading: false });
  }

  render() {
    const { product, loading } = this.state;

    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="product">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <a href="/">Voltar</a>
          </div>
        )}
      </div>
    );
  }
}
