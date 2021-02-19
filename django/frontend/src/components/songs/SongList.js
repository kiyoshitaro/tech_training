import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSongs,deleteSong } from '../../actions/songs';

import { Link } from 'react-router-dom'; // added

class SongList extends Component {
  componentDidMount() {
    this.props.getSongs();
  }

  render() {
    console.log(this.props.songs)

    return (
      <div className='ui relaxed divided list' style={{ marginTop: '2rem' }}>
        {
            this.props.songs.map(song => (
          <div className='item' key={song.id}>
          <div className='right floated content'> 
              <Link
                to={`delete/${song.id}`}
                className='small ui negative basic button'
              >
                Delete
              </Link>
            </div>
            <i className='large calendar outline middle aligned icon' />
            <div className='content'>
              {/* <a className='header'>{song.title}</a> */}
              <Link to={`edit/${song.id}`} className='header'>
              {song.title}
              </Link>
              <div className='description'>{song.artist}</div>
              <div className='description'>{song.comment}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  songs: Object.values(state.songs)
});

export default connect(
  mapStateToProps,
  { getSongs, deleteSong }
)(SongList);
