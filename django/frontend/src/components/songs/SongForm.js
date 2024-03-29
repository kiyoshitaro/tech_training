import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class SongForm extends Component {
  renderField = ({ input, label, meta: { touched, error } }) => {
    return (
      <div className={`field ${touched && error ? 'error' : ''}`}>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        {touched && error && (
          <span className='ui pointing red basic label'>{error}</span>
        )}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    const btnText = `${this.props.initialValues ? 'Update' : 'Add'}`;
    return (
      <div className='ui segment'>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className='ui form error'
        >
          <Field name='title' component={this.renderField} label='Title' />
          <Field name='artist' component={this.renderField} label='Artist' />
          <Field name='comment' component={this.renderField} label='Comment' />
          <button className='ui primary button'>{btnText}</button>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'Please enter at least 1 title';
  }  
  if (!formValues.artist) {
    errors.artist = 'Please enter at least 1 artist';
  }

  return errors;
};

export default reduxForm({
  form: 'songForm',
  touchOnBlur: false,
  validate
})(SongForm);