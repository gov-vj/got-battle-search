import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Locations from './component/Locations'

class App extends Component {
  constructor() {
    super();
    this.searchQuery = this.searchQuery.bind(this);
    this.state = {
      query: '',
      results: [],
      count: null,
      locations: [],
      displayLocations: false
    };
  }

  componentDidMount() {
    fetch('/api/count')
      .then(response => response.json())
      .then(json => this.setState({ count: json }));
    
    fetch('/api/list')
      .then(response => response.json())
      .then(json => this.setState({ locations: json }));
  }

  searchQuery() {
    if (this.state.query === '') {
      this.setState({ results: [] });
      return;
    }

    fetch(`/api/search?${this.state.query}`)
    .then(response => response.json())
    .then(json => this.setState({ results: json }));
  }

  renderSearchResult() {
    return this.state.results.map(result => (
      <div className="card" key={result._id}>
        <div className="card-body">
          <p className="card-text">{JSON.stringify(result, null, 10)}</p>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
            <div className="pull-left">Total battles: {this.state.count}</div>
          <div>
            <a href="#" onClick={() => this.setState({displayLocations: true})}>Battle locations</a>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={this.state.query}
              onChange={ev => this.setState({query: ev.target.value})}
              placeholder="Search"
              aria-label="Search"
              aria-describedby="Search battles"/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.searchQuery}>Search</button>
            </div>
          </div>
        {this.state.results.length > 0 && this.renderSearchResult()}
        </div>
        <Locations
          show={this.state.displayLocations}
          handleClose={() => this.setState({displayLocations: false})}
          locations={this.state.locations}/>
      </div>
    );
  }
}

export default App;
