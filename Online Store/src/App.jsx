import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import Produto from './pages/Produto';
import Checkout from './pages/Checkout';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route>
          <Route exact path="/" component={ Home } />
          <Route exact path="/carrinho" component={ Carrinho } />
          <Route path="/produto/:id" component={ Produto } />
          <Route path="/checkout" component={ Checkout } />
        </Route>
      </Switch>
    );
  }
}

export default App;
