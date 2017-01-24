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
    activePage: pagination.activePage,
    search: movies.search
  }
}

class Main extends Component {

  render() {
    const { items, isLoaded, activePage } = this.props;
    const { fetchPopular, fetchSearch, changePage, addFavorite, removeFavorite, search } = this.props;

    return (
      <div className="main">
        <Search fetchPopular={fetchPopular} fetchSearch={fetchSearch} />
        {!isLoaded
          ? 'Err'
          : (<Album
              fetchSearch={fetchSearch}
              items={items}
              search={search}
              activePage={activePage}
              fetchPopular={fetchPopular}
              removeFavorite={removeFavorite}
              addFavorite={addFavorite}
              changePage={changePage}
            />)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
