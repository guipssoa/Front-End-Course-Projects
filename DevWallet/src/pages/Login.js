import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginWallet } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    disabledButtonLogin: true,
    email: '',
    userPassword: '',
  };

  enabledButtonLogin = () => {
    const { email, userPassword } = this.state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validateEmail = regex.test(email);
    const minCharacterPassword = 5;
    const validatePassword = userPassword.length > minCharacterPassword;

    if (validateEmail && validatePassword) {
      this.setState({ disabledButtonLogin: false });
    } else {
      this.setState({ disabledButtonLogin: true });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(loginWallet(email));
    history.push('/carteira');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.enabledButtonLogin);
  };

  render() {
    const { disabledButtonLogin, email, userPassword } = this.state;
    return (
      <div>
        <h1> TRYBEWALLET </h1>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="email">

            Email:
            <input
              data-testid="email-input"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              placeholder="Email"
            />
          </label>
          <label htmlFor="password">

            Senha:

            <input
              data-testid="password-input"
              name="userPassword"
              value={ userPassword }
              onChange={ this.handleChange }
              placeholder="Password"
            />
          </label>
          <button
            type="submit"
            disabled={ disabledButtonLogin }
          >
            ENTRAR
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
