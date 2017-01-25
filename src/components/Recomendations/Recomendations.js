import React, { Component } from 'react';

import Movie from '../Movie/Movie';
import { perPage } from '../../utils/utils';

export default class Recomendations extends Component {

  render() {
    const { items, activePageR } = this.props;

    const movieNum = perPage(items.length);
    const moviLoads = items.map((item) => (
      <div key={item.id}>
        <Movie item={item} search={false} />
      </div>
    )).slice(movieNum[activePageR], movieNum[activePageR]+4);

    return (
      <div className="album">
        {moviLoads}
      </div>
    );
  }
}
