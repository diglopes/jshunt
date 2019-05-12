import React, { Component } from "react";
import api from "../../services/api";
import Loading from "../../components/LoadingComponent";
import { Link } from "react-router-dom";

import "./styles.css";

export default class Main extends Component {
  state = {
    products: [],
    productsInfo: {},
    page: 1,
    loading: true
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const { data } = await api.get(`/products?page=${page}`);
    const { docs, ...productsInfo } = data;
    this.setState({ products: docs, productsInfo, page, loading: false });
  };

  prevPage = () => {
    const { page } = this.state;
    if (page === 1) return;

    const pageNumber = page - 1;
    this.loadProducts(pageNumber);
  };

  nextPage = () => {
    const { page, productsInfo } = this.state;
    if (page === productsInfo.pages) return;

    const pageNumber = page + 1;
    this.loadProducts(pageNumber);
  };

  render() {
    const { products, page, productsInfo, loading } = this.state;

    return (
      <React.Fragment>
        {loading ? (
          <Loading />
        ) : (
          <div className="products-list">
            {products.map(product => (
              <article key={product._id}>
                <h2>{product.title}</h2>
                <p>{product.description}</p>

                <Link to={`/products/${product._id}`}>Acessar</Link>
              </article>
            ))}
            <div className="actions">
              <button disabled={page === 1} onClick={this.prevPage}>
                Anterios
              </button>
              <button
                disabled={page === productsInfo.pages}
                onClick={this.nextPage}
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
