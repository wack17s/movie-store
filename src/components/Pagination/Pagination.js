import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

export default class Search extends Component {

  /*componentDidMount() {
    this.props.changePage(1)
  }*/

  handleSelect(eventKey) {
    this.props.changePage(eventKey);
  }

  render() {

    const { activePage, items } = this.props;

    const pag = (activePage, items) => {
      if (items.length > 4) {
        return (<Pagination
                  prev={activePage === 1 ? false : true}
                  next={activePage === Math.ceil((items.length)/4) ? false : true}
                  first={activePage <= 2 ? false : true}
                  last={activePage >= Math.ceil((items.length)/4) - 2 ? false : true}
                  ellipsis
                  boundaryLinks
                  items={Math.ceil((items.length)/4)}
                  maxButtons={5}
                  activePage={activePage}
                  onSelect={this.handleSelect.bind(this)} />);
      } else return '';
    }

    return (
      <div className="pagination">
        {pag(activePage, items)}
      </div>
    );
  }
}
