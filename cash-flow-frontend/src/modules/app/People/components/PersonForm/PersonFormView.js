/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Paper } from 'react-md';


const PersonFormView = ({ name, onChangeName, save }) => (
  <Paper className="people-form">
    <input autoFocus name="name" label="Name" value={name} onChange={onChangeName} />
    <Button raised onClick={save}>Save</Button>
  </Paper>
);
PersonFormView.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};


export default PersonFormView;
