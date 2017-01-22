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

  handleAdd = () => this.props.addFavorite(this.props.item);

  fetchData(id) {
    this.props.openMovie(id);
    this.props.fetchRecomendations(id);
  }

  render() {
    const { item, items, activePage, isLoaded } = this.props;
    const { changePage, addFavorite } = this.props;

    const loadMovie = (item) => {

      if (lockr.get(['movies' + item.id])) {
        return (
          <div>
            <img role="presentation" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+ item.poster_path} />
            <p>Favorite</p>
          </div>
        )
      } else {
        return (
          <div>
            <img role="presentation" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+ item.poster_path} />
            <button type="button" onClick={this.handleAdd} >Add to favorite</button>          
          </div>
        )
      }
    }

    return (
      <div className="fullmovie">
        {isLoaded
          ? loadMovie(item)
          : 'err'}
        {items && items.length > 4
          ? (<div>
              <Recomendations activePage={activePage} changePage={changePage} items={items} />
              <Pagination items={items} activePage={activePage} changePage={changePage} />
            </div>)
          : (<Recomendations
              addFavorite={addFavorite}
              activePage={activePage}
              changePage={changePage}
              items={items}
            />)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullMovie);
