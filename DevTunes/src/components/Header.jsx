import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import InLoad from './InLoad';

class Header extends React.Component {
  state = {
    name: '',
    inLoad: false,
  };

  componentDidMount() {
    getUser().then(({ name }) => this.setState({
      name,
      inLoad: true,
    }));
  }

  render() {
    const { name, inLoad } = this.state;
    return (
      <header data-testid="header-component">
        <fieldset>
          <nav>
            <Link to="/search" data-testid="link-to-search"> Search</Link>
            <Link to="/favorites" data-testid="link-to-favorites"> Favorite Músics</Link>
            <Link to="/profile" data-testid="link-to-profile"> Profile</Link>
          </nav>
          { inLoad ? (
            <h1 data-testid="header-user-name">{name}</h1>
          ) : (
            <InLoad />
          )}
        </fieldset>
      </header>
    );
  }
}

export default Header;
