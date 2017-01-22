import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

export default class Search extends Component {

  handleSelect(eventKey) {
    this.props.changePage(eventKey);
  }

  render() {

    const { activePage, items } = this.props;

    return (
      <div className="pagination">
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={Math.ceil((items.length)/4)}
          maxButtons={5}
          activePage={activePage}
          onSelect={this.handleSelect.bind(this)} />
      </div>
    );
  }
}
