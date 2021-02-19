import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSong, editSong } from '../../actions/songs';
import SongForm from './SongForm';

class SongEdit extends Component {
  componentDidMount() {
    this.props.getSong(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editSong(this.props.match.params.id, formValues);
  };

  render() {
    return (
      <div className='ui container'>
        <h2 style={{ marginTop: '2rem' }}>Edit Song</h2>
        <SongForm
          initialValues={_.pick(this.props.song, 'title')}
          enableReinitialize={true}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  song: state.songs[ownProps.match.params.id]
});

export default connect(
  mapStateToProps,
  { getSong, editSong }
)(SongEdit);
