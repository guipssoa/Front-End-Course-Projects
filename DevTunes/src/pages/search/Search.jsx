import React from 'react';
import Header from '../../components/Header';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import CardAlbum from '../../components/CardAlbum';
import InLoad from '../../components/InLoad';

class Search extends React.Component {
  state = {
    search: '',
    buttonOff: true,
    inLoad: false,
    nameArtist: '',
    album: [],
    request: false,
    empty: false,
  };

  onChange = ({ target }) => {
    const minCharacters = 2;
    this.setState({ search: target.value });
    if (target.value.length >= minCharacters) {
      this.setState({ buttonOff: false });
    } else {
      this.setState({ buttonOff: true });
    }
  };

  validateSearch = async () => {
    this.setState({ inLoad: true });
    const { search } = this.state;
    const response = await searchAlbumsAPI(search);
    if (response.length > 0) {
      this.setState({ album: response });
      this.setState({ inLoad: false });
      this.setState({ request: true });
      this.setState({
        nameArtist: search,
        search: '',
      });
    } else {
      this.setState({ empty: true });
      this.setState({ album: response });
      this.setState({ inLoad: false });
      this.setState({ request: true });
    }
  };

  render() {
    const { buttonOff, search,
      album, inLoad,
      request, empty,
      nameArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <fieldset>
          { inLoad ? <InLoad /> : (
            <div>
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={ this.onChange }
                value={ search }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ buttonOff }
                onClick={ this.validateSearch }
              >
                Pesquisar
              </button>
              <div>
                { request && (
                  <div>
                    {
                      empty ? <p>Nenhum álbum foi encontrado</p>
                        : (
                          <p>
                            Resultado de álbuns de:
                            {' '}
                            { nameArtist }
                          </p>
                        )
                    }
                    { album.map((param) => (<CardAlbum
                      key={ param.collectionId }
                      album={ param }
                    />))}
                  </div>
                )}
              </div>
            </div>
          )}
        </fieldset>
      </div>
    );
  }
}

export default Search;
