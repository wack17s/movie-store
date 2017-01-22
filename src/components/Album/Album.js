import React, { Component } from 'react';
import lockr from 'lockr';

import Movie from '../Movie/Movie';
import Pagination from '../Pagination/Pagination';
import { perPage } from '../../utils/utils';

export default class Album extends Component {
  render() {

    const { items, activePage, changePage, addFavorite } = this.props;

    const movieNum = perPage(items.length);
    const moviLoads = (items, addFavorite) => {
      let res = [];
      for (let i = 0; i < items.length; ++i) {
        let ifFavorite;
        if (lockr.get(['movies'+items[i].id])) ifFavorite = true;
        else ifFavorite = false;

        res.push(
          (<div key={items[i].id}>
            <Movie isFavorite={ifFavorite} isInAlbum={true} addFavorite={addFavorite} item={items[i]} />
          </div>)
        );
      }
      
      return res;
    };

    return (
        <div className="album">
          {moviLoads(items, addFavorite).slice(movieNum[activePage], movieNum[activePage]+4)}
          {items.length > 4
          ? (<Pagination items={items} activePage={activePage} changePage={changePage} />)
          : (<br></br>)}
        </div>
    );
  }
}
