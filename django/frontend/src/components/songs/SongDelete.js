import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../layout/Modal';
import history from '../../history';
import { getSong, deleteSong } from '../../actions/songs';

class SongDelete extends Component {
  componentDidMount() {
    this.props.getSong(this.props.match.params.id);
  }

  renderContent() {
    if (!this.props.song) {
      return 'Are you sure you want to delete this task?';
    }
    return `Are you sure you want to delete the task: ${this.props.song.title}`;
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <button
          onClick={() => this.props.deleteSong(id)}
          className='ui negative button'
        >
          Delete
        </button>
        <Link to='/react' className='ui button'>
          Cancel
        </Link>
      </Fragment>
    );
  }

  render() {
    return (
      <Modal
        title='Delete Song'
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/react')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  song: state.songs[ownProps.match.params.id]
});

export default connect(
  mapStateToProps,
  { getSong, deleteSong }
)(SongDelete);