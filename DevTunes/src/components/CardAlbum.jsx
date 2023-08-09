import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardAlbum extends React.Component {
  render() {
    const { album } = this.props;
    const { artistName, collectionName, artworkUrl100, collectionId } = album;

    return (
      <div>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h1>{ collectionName }</h1>
          <p>{ artistName }</p>
        </Link>
      </div>
    );
  }
}
CardAlbum.propTypes = {
  album: PropTypes.shape(),
  artistName: PropTypes.string,
  collectionId: PropTypes.number,
  collectionName: PropTypes.string,
  artworkUrl100: PropTypes.string,
}.isRequired;

export default CardAlbum;
