/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button } from 'react-md';
import './CashFlowDescriptionFormView.scss';

const CashFlowDescriptionFormView = ({ name, onChangeName, save }) => (
  <Paper className="cash-flow-description-form">
    <input autoFocus name="name" label="Name" value={name} onChange={onChangeName} />
    <Button raised onClick={save}>Save</Button>
  </Paper>
);
CashFlowDescriptionFormView.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};


export default CashFlowDescriptionFormView;
