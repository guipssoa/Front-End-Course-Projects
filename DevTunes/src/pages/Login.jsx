import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    login: '',
    buttonOff: true,
    inLoad: false,
  };

  onChange = ({ target }) => {
    const minCharacters = 3;
    this.setState({ login: target.value });
    if (target.value.length >= minCharacters) {
      this.setState({ buttonOff: false });
    } else {
      this.setState({ buttonOff: true });
    }
  };

  onClick = async () => {
    this.setState({ inLoad: true });
    const { login } = this.state;
    const { history } = this.props;
    await createUser({ name: login });
    history.push('/search');
  };

  render() {
    const { buttonOff, inLoad } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            onChange={ this.onChange }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ buttonOff }
            onClick={ this.onClick }
          >
            Entrar
          </button>
        </form>
        { inLoad && <p>Carregando...</p> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Login;
