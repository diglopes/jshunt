import React, { Component } from "react";
import api from "../../services/api";
import Loading from "../../components/LoadingComponent";
import { Spring } from "react-spring/renderprops";

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
          <Spring
            from={{ opacity: 0, transform: "translate3d(0, 200px, 0)" }}
            to={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
          >
            {props => (
              <div style={props}>
                <div className="product">
                  <h1>{product.title}</h1>
                  <p>{product.description}</p>
                  <a href="/">Voltar</a>
                </div>
              </div>
            )}
          </Spring>
        )}
      </div>
    );
  }
}
