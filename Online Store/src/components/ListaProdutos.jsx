import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ListaProdutos extends Component {
  adcCarrinho = () => {
    const { dados } = this.props;
    dados.itemQuantity = 1;
    let arrayCarrinho = [];
    arrayCarrinho = JSON.parse(localStorage.getItem('cart')) || [];
    const existeNoCarrinho = arrayCarrinho.some((produto) => produto.id === dados.id);
    if (existeNoCarrinho) {
      const index = arrayCarrinho.findIndex((e) => e.id === dados.id);
      arrayCarrinho[index].itemQuantity += 1;
    } else {
      arrayCarrinho.push(dados);
    }
    localStorage.setItem('cart', JSON.stringify(arrayCarrinho));
  };

  render() {
    const { dados } = this.props;
    const { title, price, thumbnail, id } = dados;
    return (
      <>
        <Link
          data-testid="product-detail-link"
          to={ `/produto/${id}` }
        >
          <div data-testid="product">
            <p>{ title }</p>
            <p>{ price }</p>
            <img src={ thumbnail } alt="" />
          </div>
        </Link>
        <button
          type="submit"
          data-testid="product-add-to-cart"
          onClick={ this.adcCarrinho }
        >
          Adicionar ao carrinho

        </button>
      </>
    );
  }
}

ListaProdutos.propTypes = {
  dados: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
    itemQuantity: PropTypes.number,

  }).isRequired,
};

export default ListaProdutos;
