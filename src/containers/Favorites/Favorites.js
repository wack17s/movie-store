import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePage } from '../../modules/pagination';
import { fetchFavorites, removeFavorite } from '../../modules/favorites';

import Movie from '../../components/Movie/Movie';
import Pagination from '../../components/Pagination/Pagination';
import { perPage } from '../../utils/utils';

function mapStateToProps({ favorites, pagination}) {
  return {
    items: favorites.items,
    activePage: pagination.activePage
  }
}

class Favorites extends Component {

  componentWillMount() {
    this.props.fetchFavorites();
  }

  render() {

    const { items, activePage, changePage, removeFavorite } = this.props;

    const movieNum = perPage(items.length);

    const moviLoads = (items, removeFavorite) => {
      let res = [];
      for (let i = 0; i < items.length; ++i) {
        res.push(
          <div key={items[i][0].id}>
            <Movie isInFavorite={true} removeFavorite={removeFavorite} item={items[i][0]} />
          </div>);
      }

      return res;
    }

    return (
        <div className="album">
          {moviLoads(items, removeFavorite).slice(movieNum[activePage], movieNum[activePage]+4)}
          <Pagination items={items} activePage={activePage} changePage={changePage} />
        </div>
    );
  }
}

export default connect(mapStateToProps, {changePage, fetchFavorites, removeFavorite})(Favorites);
