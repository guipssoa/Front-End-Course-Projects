import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, savedExpense, editExpense } from '../redux/actions/index';
import fetchWalletApi from '../apiServices/walletApi';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentacao',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleExpense = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { dispatch } = this.props;

    const response = await fetchWalletApi();
    delete response.USDT;

    dispatch(savedExpense({ ...this.state, exchangeRates: response }));

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacao',
      description: '',
    }));
  };

  handleEditClick = () => {
    const { dispatch } = this.props;
    const { value, currency, method, tag, description } = this.state;
    dispatch(editExpense({ value, currency, method, tag, description }));

    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacao',
      description: '',
    });
  };

  render() {
    const { currencies, editing } = this.props;
    const { value, currency, method, tag, description } = this.state;

    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            placeholder="Valor"
            data-testid="value-input"
            id="value-input"
            type="number"
            value={ value }
            name="value"
            onChange={ this.handleExpense }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency-input"
            value={ currency }
            name="currency"
            onChange={ this.handleExpense }
          >
            {
              currencies.map((currencyItem, index) => (
                <option key={ index } value={ currencyItem }>{ currencyItem }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method-input"
            value={ method }
            name="method"
            onChange={ this.handleExpense }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.handleExpense }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            placeholder="Descrição"
            data-testid="description-input"
            id="description-input"
            type="text"
            value={ description }
            name="description"
            onChange={ this.handleExpense }
          />
        </label>
        <button
          type="button"
          onClick={ !editing ? this.handleClick : this.handleEditClick }
        >
          {!editing ? 'Adicionar despesa' : 'Editar despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  editing: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editing: state.wallet.editing,
});

export default connect(mapStateToProps)(WalletForm);
