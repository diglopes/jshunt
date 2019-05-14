import React, { Component } from "react";
import api from "../../services/api";
import Loading from "../../components/LoadingComponent";
import ProductComponent from "../../components/ProductComponent";
import { Spring } from "react-spring/renderprops";

import "./styles.css";

export default class Main extends Component {
  state = {
    products: [],
    productsInfo: {},
    page: 1
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    this.setState({ loading: true });
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
            {products.map((product, index) => (
              <Spring
                from={{ opacity: 0, transform: "translate3d(400px, 0, 0)" }}
                to={{ opacity: 1, transform: "translate3d(0, 0px, 0)" }}
                config={{ delay: 100 * (index + 1) }}
              >
                {style => (
                  <div style={style}>
                    <ProductComponent product={product} />
                  </div>
                )}
              </Spring>
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
