import React, { Component } from 'react';
import lockr from 'lockr';

import Movie from '../Movie/Movie';
import Pagination from '../Pagination/Pagination';
import { perPage } from '../../utils/utils';

export default class Album extends Component {
  
  render() {

    const { items, activePage, changePage, addFavorite, fetchPopular, fetchSearch, search } = this.props;

    const movieNum = perPage(items.length);
    const moviLoads = (items, addFavorite, fetchPopular) => {
      let res = [];
      for (let i = 0; i < items.length; ++i) {
        let ifFavorite;
        if (lockr.get(['movies'+items[i].id])) ifFavorite = true;
        else ifFavorite = false;

        res.push(
          (<div key={items[i].id}>
            <Movie
              fetchSearch={fetchSearch}
              search={search}
              isFavorite={ifFavorite}
              fetchPopular={fetchPopular}
              isInAlbum={true}
              addFavorite={addFavorite}
              item={items[i]}
            />
          </div>)
        );
      }
      
      return res;
    };

    return (
        <div className="album">
          {moviLoads(items, addFavorite, fetchPopular).slice(movieNum[activePage], movieNum[activePage]+4)}
          <Pagination items={items} activePage={activePage} changePage={changePage} rec={false} />
        </div>
    );
  }
}
