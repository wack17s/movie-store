import React, { Component } from 'react';

export default class Search extends Component {

	handleChangeQuery(event) {
		if (event.target.value === '') this.props.fetchPopular();
		else this.props.fetchSearch(event.target.value);
	}

  render() {
    return (
      <div className="search">
        <input onChange={this.handleChangeQuery.bind(this)} placeholder='Search...' />
      </div>
    );
  }
}
