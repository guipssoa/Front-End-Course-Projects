import React, { Component } from 'react';

class ListaCheckout extends Component {
  render() {
    const retorno = localStorage.getItem('cart');
    const carrinho = JSON.parse(retorno);

    return (
      (carrinho ? carrinho.map((item) => (
        <div key={ item.id }>
          <p data-testid="review-card-email">{ item.title }</p>
          <p>{ item.price }</p>
        </div>)) : null)
    );
  }
}
export default ListaCheckout;
