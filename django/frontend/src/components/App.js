import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Dashboard from './songs/Dashboard'; // added
import Header from './layout/Header'; // added


import { Provider } from 'react-redux'; // added
import store from '../store'; // added


import { Router, Route, Switch } from 'react-router-dom'; // added

import history from '../history'; // added
import SongDelete from './songs/SongDelete'; // added
import SongEdit from './songs/SongEdit'; // added


class App extends Component {
  render() {
    return (
    <Provider store={store}>

        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path='/react' component={Dashboard} />
            <Route exact path='/react/delete/:id' component={SongDelete} />
            <Route exact path='/react/edit/:id' component={SongEdit}/>
          </Switch>
        </Router>

        {/* <Header/>
        <Dashboard /> */}
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));