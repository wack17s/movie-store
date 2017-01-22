import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPopular, fetchSearch } from '../../modules/movies';
import { changePage } from '../../modules/pagination';
import { addFavorite, removeFavorite } from '../../modules/favorites';

import Album from '../../components/Album/Album';
import Search from '../../components/Search/Search';

import './Main.css';

const mapDispatchToProps = {
  fetchPopular,
  fetchSearch,
  changePage,
  addFavorite,
  removeFavorite
};

function mapStateToProps({ movies, pagination }) {
  return {
    items: movies.items,
    isLoaded: movies.isLoaded,
    activePage: pagination.activePage
  }
}

class Main extends Component {

  render() {
    const { items, isLoaded, activePage } = this.props;
    const { fetchPopular, fetchSearch, changePage, addFavorite, removeFavorite } = this.props;

    return (
      <div className="main">
        <Search fetchPopular={fetchPopular} fetchSearch={fetchSearch} />
        {!isLoaded
          ? 'Err'
          : (<Album items={items} activePage={activePage} removeFavorite={removeFavorite} addFavorite={addFavorite} changePage={changePage} />)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
