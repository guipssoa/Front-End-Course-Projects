import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = Object.values(expenses).reduce((acc, currExpense) => acc
      + (currExpense.value * currExpense.exchangeRates[currExpense.currency].ask), 0);
    return (
      <div>
        <h1> TRYBEWALLET </h1>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ totalExpenses.toFixed(2) ?? 0 }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
