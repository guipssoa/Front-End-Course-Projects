import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import AvaliacaoProdutos from '../components/AvaliacaoProdutos';

export default class Produto extends Component {
  state = {
    nome: '',
    preco: '',
    imagem: '',
    dados: [],
    email: '',
    comentario: '',
    rate: '',
    renderizarErro: false,
  };

  componentDidMount() {
    this.pegarDados();
  }

  pegarDados = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const dados = await getProductById(id);
    const { title, thumbnail, price } = dados;
    this.setState({ nome: title, imagem: thumbnail, preco: price, dados });
  };

  salvarLocalStorage = () => {
    const { dados } = this.state;
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

  atualizarStates = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  validarForms = (event) => {
    const { email, comentario, rate, dados } = this.state;
    const local = JSON.parse(localStorage.getItem(dados.id)) || [];
    if (email === '' || rate === '') {
      event.preventDefault();
      this.setState({ renderizarErro: true });
    } else {
      local.push({ email, comentario, rate });
      localStorage.setItem(dados.id, JSON.stringify(local));
      this.setState({ email: '', comentario: '', rate: '', renderizarErro: false });
    }
  };

  render() {
    const { nome, preco, imagem, email, comentario, renderizarErro, dados } = this.state;
    return (
      <>
        <div>
          <h1 data-testid="product-detail-name">{ nome }</h1>
          <img
            src={ imagem }
            alt="Imagem do Produto"
            data-testid="product-detail-image"
          />
          <h2 data-testid="product-detail-price">{ preco }</h2>
          <Link to="/carrinho">
            <button data-testid="shopping-cart-button" type="button">Carrinho</button>
          </Link>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ this.salvarLocalStorage }
          >
            Adicionar ao Carrinho

          </button>
        </div>

        <form action="">
          <fieldset>
            <h1>Avaliação do produto</h1>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                data-testid="product-detail-email"
                id="email"
                name="email"
                onChange={ this.atualizarStates }
                value={ email }
              />
            </label>
            <br />
            <label htmlFor="1">
              nota: 1
              <input
                data-testid="1-rating"
                type="radio"
                id="1"
                name="rate"
                value="1"
                onChange={ this.atualizarStates }
              />
            </label>
            <label htmlFor="2">
              2
              <input
                data-testid="2-rating"
                type="radio"
                id="2"
                name="rate"
                value="2"
                onChange={ this.atualizarStates }
              />
            </label>
            <label htmlFor="3">
              3
              <input
                data-testid="3-rating"
                type="radio"
                id="3"
                name="rate"
                value="3"
                onChange={ this.atualizarStates }
              />
            </label>
            <label htmlFor="4">
              4
              <input
                data-testid="4-rating"
                type="radio"
                id="4"
                name="rate"
                value="4"
                onChange={ this.atualizarStates }
              />
            </label>
            <label htmlFor="5">
              5
              <input
                data-testid="5-rating"
                type="radio"
                id="5"
                name="rate"
                value="5"
                onChange={ this.atualizarStates }
              />
            </label>

            <p>Comentario:</p>
            <textarea
              data-testid="product-detail-evaluation"
              name="comentario"
              onChange={ this.atualizarStates }
              value={ comentario }
              id=""
              cols="30"
              rows="10"
            />
            <br />
            <button
              type="submit"
              data-testid="submit-review-btn"
              onClick={ this.validarForms }
            >
              Enviar avaliação

            </button>
          </fieldset>
        </form>
        { renderizarErro ? <p data-testid="error-msg">Campos inválidos</p> : null }
        { dados.id !== undefined ? <AvaliacaoProdutos id={ dados.id } /> : null}
      </>
    );
  }
}

Produto.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};
