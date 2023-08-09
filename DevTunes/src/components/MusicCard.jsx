import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InLoad from './InLoad';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    forSave: false,
    saved: false,
  };

  async componentDidMount() {
    const { trackName } = this.props;
    const favorites = await getFavoriteSongs();
    const arrFavorites = [
      ...favorites.map((favoriteSong) => favoriteSong.trackName),
    ];
    if (arrFavorites.includes(trackName)) {
      this.setState({
        saved: true,
      });
    }
  }

  newFavorite = (addFavorites, { checked }) => {
    if (checked) {
      this.setState({ forSave: true }, async () => {
        await addSong(addFavorites);
        this.setState({ forSave: false, saved: true });
      });
    }
  };

  render() {
    const { trackId, previewUrl, trackName, artistName } = this.props;
    const { forSave, saved } = this.state;
    return (forSave)
      ? <InLoad />
      : (
        <>
          <p>{ trackName }</p>
          <p>{ artistName }</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor="favoriteMusics">
            Favorita
            <input
              type="checkbox"
              name="favoriteMusics"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ saved }
              onChange={ ({ target }) => this.newFavorite({
                trackId, trackName, previewUrl, artistName }, target) }
            />
          </label>
        </>
      );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
  artistName: PropTypes.string,
}.isRequired;

export default MusicCard;
