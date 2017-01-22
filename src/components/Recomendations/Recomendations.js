import React, { Component } from 'react';

import Movie from '../Movie/Movie';
import { perPage } from '../../utils/utils';

export default class Recondations extends Component {

  render() {
    const { items, activePage } = this.props;

    const movieNum = perPage(items.length);
    const moviLoads = items.map((item) => (
      <div key={item.id}>
        <Movie item={item} />
      </div>
    )).slice(movieNum[activePage], movieNum[activePage]+4);

    return (
      <div className="album">
        {moviLoads}
      </div>
    );
  }
}
