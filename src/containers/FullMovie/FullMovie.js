import React, { Component } from 'react';
import { connect } from 'react-redux';
import lockr from 'lockr';

import { fetchRecomendations } from '../../modules/movies';
import { openMovie } from '../../modules/movie';
import { addFavorite } from '../../modules/favorites';
import { changePage } from '../../modules/pagination';

import Recomendations from '../../components/Recomendations/Recomendations';
import Pagination from '../../components/Pagination/Pagination';

const mapDispatchToProps = {
  fetchRecomendations,
  openMovie,
  changePage,
  addFavorite
};

function mapStateToProps({ movies, movie, pagination }) {
  return {
    item: movie.item,
    items: movies.items,
    activePage: pagination.activePage,
    isLoaded: movie.isLoaded
  }
}

class FullMovie extends Component {

  componentDidMount() {
    this.fetchData(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.fetchData(nextProps.params.id);
    }
  }

  handleAdd = () => {
    this.props.addFavorite(this.props.item);
    this.props.openMovie(this.props.item.id);
  }

  fetchData(id) {
    this.props.openMovie(id);
    this.props.fetchRecomendations(id);
    this.props.changePage(1);
  }

  render() {
    const { item, items, activePage, isLoaded } = this.props;
    const { changePage } = this.props;

    const loadMovie = (item) => {
      let FavButton;

      if (lockr.get(['movies' + item.id])) {
        FavButton = (<p>Favorite</p>)
      } else {
        FavButton = (<button type="button" onClick={this.handleAdd} >Add to favorite</button>)
      }

      return FavButton;
    }

    return (
      <div className="fullmovie">
        {isLoaded
          ? (<div>
              {item.original_title}
              <p><img role="presentation" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+ item.poster_path} /></p>
              {loadMovie(item)}
              <p>{item.overview}</p>
              <p>{'date: ' + item.release_date}</p>
              <p>{item.genres.map(genre => genre.name + ' ')}</p>
              <p>{'homepage: ' + item.homepage}</p>
              <p>{'product companies: ' + item.production_companies.map(companie => companie.name)}</p>
              <p>{'countries: ' + item.production_countries.map(country => country.iso_3166_1)}</p>
              <p>{item.vote_average + '/10 by '}
              {item.vote_count}</p>
            </div>)
          : 'err'}
          <p>{'R E C O M E N D A T I O N S'}</p>
          <Recomendations activePage={activePage} changePage={changePage} items={items} search={false} />
          <Pagination items={items} activePage={activePage} changePage={changePage} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullMovie);
