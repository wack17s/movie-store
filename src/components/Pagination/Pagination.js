import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

export default class Search extends Component {

  componentDidMount() {
    this.props.rec
    ? this.props.changePage(1, 1)
    : this.props.changePage(this.props.activePage);
  }

  handleSelect = (eventKey) => {
    this.props.rec
    ? this.props.changePage(eventKey, 1)
    : this.props.changePage(eventKey);
  }

  render() {

    const { activePage, activePageR, items, rec } = this.props;

    let actPage;
    if (rec) actPage = activePageR;
    else actPage = activePage;

    const pag = (activePage, items) => {
      if (items.length > 4) {
        return (<Pagination
                  prev={actPage === 1 ? false : true}
                  next={actPage === Math.ceil((items.length)/4) ? false : true}
                  first={actPage <= 2 ? false : true}
                  last={actPage >= Math.ceil((items.length)/4) - 2 ? false : true}
                  ellipsis
                  boundaryLinks
                  items={Math.ceil((items.length)/4)}
                  maxButtons={5}
                  activePage={actPage}
                  onSelect={this.handleSelect} />);
      } else return '';
    }

    return (
      <div className="pagination">
        {pag(activePage, items)}
      </div>
    );
  }
}
