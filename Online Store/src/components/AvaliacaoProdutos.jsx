import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AvaliacaoProdutos extends Component {
  render() {
    const { id } = this.props;
    const retorno = localStorage.getItem(id);
    const cometarios = JSON.parse(retorno);
    if (cometarios === null) {
      return;
    }

    return (
      cometarios.map((cometario) => (
        <>
          <p data-testid="review-card-email">{ cometario.email }</p>
          <p data-testid="review-card-evaluation">{ cometario.comentario }</p>
          <p data-testid="review-card-rating">{ cometario.rate }</p>
        </>))

    );
  }
}

AvaliacaoProdutos.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AvaliacaoProdutos;
