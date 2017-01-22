import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Movie extends Component {

  handleRemove = () => this.props.removeFavorite(this.props.item);
  handleAdd = () => this.props.addFavorite(this.props.item);

  render() {

    const { item, isFavorite, isInAlbum, isInFavorite } = this.props;

    const addButton = (isInAlbum, isFavorite) => {
      if (isInAlbum) {
        if (isFavorite) return 'In Favorite';
        else return (<button type="button" onClick={this.handleAdd} >Add to favorite</button>);
      }
    }

    const removeButton = (isInFavorite) => {
      if (isInFavorite) return (<button type="button" onClick={this.handleRemove} >Remove from favorite</button>)
    }

    return (
      <div className="movie">
        <Link to={`/movie/${item.id}`} >
          <img role="presentation" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+ item.poster_path} />
        </Link>
        {addButton(isInAlbum, isFavorite)}
        {removeButton(isInFavorite)}
      </div>
    );
  }
}
