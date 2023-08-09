import React from 'react';
import { Link } from 'react-router-dom';
import ListaProdutos from '../components/ListaProdutos';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    categoria: '',
    dadosProdutos: [],
    dados: [],
  };

  componentDidMount() {
    this.pegarCategorias();
  }

  pegarCategorias = async () => {
    const dados = await getCategories();
    this.setState({ dados });
  };

  manipularAlterar = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  produtosCategoriasFetch = async () => {
    const { categoria } = this.state;
    const resposta = await getProductsFromCategoryAndQuery(null, categoria);
    this.setState({ dadosProdutos: resposta.results });
  };

  funClickBtnListaCaterogiras = (e) => {
    const { value } = e.target;
    this.setState({ categoria: value }, () => this.produtosCategoriasFetch());
  };

  render() {
    const { dadosProdutos } = this.state;
    const { dados } = this.state;
    const listarCategorias = dados.map(({ name }, i) => (
      <button
        key={ i }
        type="submit"
        data-testid="category"
        name="categoria"
        value={ name }
        onClick={ this.funClickBtnListaCaterogiras }
      >
        { name }
      </button>
    ));
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <input
          type="text"
          data-testid="query-input"
          name="categoria"
          onChange={ this.manipularAlterar }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.produtosCategoriasFetch }
        >
          Buscar
        </button>
        <Link
          data-testid="shopping-cart-button"
          type="button"
          to="/carrinho"
        >
          Carrinho
        </Link>
        {listarCategorias}
        { dadosProdutos.length > 0 ? (
          dadosProdutos.map((dado, i) => (
            <ListaProdutos
              key={ i }
              dados={ dado }
            />))) : (<p>Nenhum produto foi encontrado</p>) }
      </div>
    );
  }
}

export default Home;
