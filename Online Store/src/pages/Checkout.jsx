import React, { Component } from 'react';
import propTypes from 'prop-types';
import ListaCheckout from '../components/ListaCheckout';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      cep: '',
      endereço: '',
      formaPagamento: '',
      renderizarErro: false,
    };
  }

  atualizarStates = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  validarCampos = async (e) => {
    const { history } = this.props;
    const {
      nome,
      email,
      cpf,
      telefone,
      cep,
      endereço,
      formaPagamento,
    } = this.state;

    if (nome === '' || email === '' || cpf === ''
    || telefone === '' || cep === '' || endereço === '' || formaPagamento === '') {
      e.preventDefault();
      this.setState({ renderizarErro: true });
    } else {
      await this.setState({ renderizarErro: false }, () => this.limparCarrinho(e));
      history.push('/');
    }
  };

  limparCarrinho = (e) => {
    e.preventDefault();
    localStorage.removeItem('cart');
  };

  render() {
    const {
      nome,
      email,
      cpf,
      telefone,
      cep,
      endereço,
      renderizarErro,
    } = this.state;

    return (
      <div>
        <ListaCheckout />
        <form action="">
          <label htmlFor="nome">
            Nome completo:
            <br />
            <input
              data-testid="checkout-fullname"
              type="text"
              name="nome"
              onChange={ this.atualizarStates }
              value={ nome }
              required
            />
          </label>
          <br />

          <label htmlFor="email">
            Email:
            <br />
            <input
              data-testid="checkout-email"
              type="text"
              name="email"
              onChange={ this.atualizarStates }
              value={ email }
              required
            />
          </label>
          <br />

          <label htmlFor="cpf">
            CPF:
            <br />
            <input
              data-testid="checkout-cpf"
              type="text"
              name="cpf"
              onChange={ this.atualizarStates }
              value={ cpf }
              required
            />
          </label>
          <br />

          <label htmlFor="telefone">
            Telefone:
            <br />
            <input
              data-testid="checkout-phone"
              type="text"
              name="telefone"
              onChange={ this.atualizarStates }
              value={ telefone }
              required
            />
          </label>
          <br />

          <label htmlFor="cep">
            CEP:
            <br />
            <input
              data-testid="checkout-cep"
              type="text"
              name="cep"
              onChange={ this.atualizarStates }
              value={ cep }
              required
            />
          </label>
          <br />

          <label htmlFor="endereço">
            Endereço:
            <br />
            <input
              data-testid="checkout-address"
              type="text"
              name="endereço"
              onChange={ this.atualizarStates }
              value={ endereço }
              required
            />
          </label>
          <br />

          <label htmlFor="boleto">
            Boleto
            <input
              data-testid="ticket-payment"
              type="radio"
              name="formaPagamento"
              id="boleto"
              onChange={ this.atualizarStates }
              value="boleto"
            />
          </label>
          <label htmlFor="visa">
            Visa
            <input
              data-testid="visa-payment"
              type="radio"
              name="formaPagamento"
              id="visa"
              onChange={ this.atualizarStates }
              value="visa"
            />
          </label>
          <label htmlFor="mastercard">
            MasterCard
            <input
              data-testid="master-payment"
              type="radio"
              name="formaPagamento"
              id="mastercard"
              onChange={ this.atualizarStates }
              value="mastercard"
            />
          </label>
          <label htmlFor="elo">
            Elo
            <input
              data-testid="elo-payment"
              type="radio"
              name="formaPagamento"
              id="elo"
              onChange={ this.atualizarStates }
              value="elo"
            />
          </label>

          <button
            type="submit"
            data-testid="checkout-btn"
            onClick={ this.validarCampos }
          >
            Confirmar

          </button>

        </form>
        { renderizarErro ? <p data-testid="error-msg">Campos inválidos</p> : null }
      </div>
    );
  }
}

Checkout.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
