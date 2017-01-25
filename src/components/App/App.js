import React, { Component } from 'react';
import { Link } from 'react-router';

import Header from '../Header/Header';

/*import './App.css';*/

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
            <Header inverted as="h1" />
        </div>
        <Link to={'/favorites'} >
          {'Favorites'}
        </Link>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
