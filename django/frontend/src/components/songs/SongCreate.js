import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSong } from '../../actions/songs';
import SongForm from './SongForm';

class SongCreate extends Component {
  onSubmit = formValues => {
    this.props.addSong(formValues);
  };

  render() {
    return (
      <div style={{ marginTop: '2rem' }}>
        <SongForm destroyOnUnmount={false} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { addSong }
)(SongCreate);