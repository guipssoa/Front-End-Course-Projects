import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../../components/Header';
import musicsAPI from '../../../services/musicsAPI';
import InLoad from '../../../components/InLoad';
import MusicCard from '../../../components/MusicCard';

class Album extends React.Component {
  state = {
    musics: [],
  };

  async componentDidMount() {
    this.searchMusics();
  }

  searchMusics = async () => {
    this.setState({ inLoad: true });
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await musicsAPI(id);
    this.setState({
      inLoad: false,
      musics,
    });
  };

  totalSearchMusics = (musics) => {
    const resultMusics = musics.slice(1).map((music, index) => (
      <MusicCard
        key={ index }
        music={ music }
        trackId={ music.trackId }
        trackName={ music.trackName }
        previewUrl={ music.previewUrl }
      />));
    return resultMusics;
  };

  render() {
    const { inLoad, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { inLoad ? <InLoad /> : (
          <div>
            { musics.length === 0 ? <InLoad /> : (
              <div>
                <p data-testid="artist-name">
                  Artista:
                  { musics[0].artistName}
                </p>
                <p data-testid="album-name">
                  Album:
                  { musics[0].collectionName}
                </p>
                {this.totalSearchMusics(musics)}
              </div>
            )}
          </div>
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape(),
  params: PropTypes.shape(),
  id: PropTypes.string,
}.isRequired;

export default Album;
