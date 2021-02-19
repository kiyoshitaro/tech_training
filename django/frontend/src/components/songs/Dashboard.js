import React, { Component } from 'react';
import SongList from './SongList';
import SongCreate from './SongCreate';

class Dashboard extends Component {
  render() {
    return (
      <div className='ui container'>
        <div>Todo Create Form</div>
        <div>New</div>
        <SongCreate />
        <SongList />
      </div>
    );
  }
}

export default Dashboard;
