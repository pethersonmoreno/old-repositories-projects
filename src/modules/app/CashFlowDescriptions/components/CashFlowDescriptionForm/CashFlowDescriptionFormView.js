/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import './CashFlowDescriptionFormView.scss';

const CashFlowDescriptionFormView = ({ name, onChangeName, save }) => (
  <div className="cf-paper cash-flow-description-form">
    <input autoFocus name="name" label="Name" value={name} onChange={onChangeName} />
    <button type="button" className="cf-btn cf-btn--block cf-btn--text cf-btn--raised" onClick={save}>Save</button>
  </div>
);
CashFlowDescriptionFormView.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};


export default CashFlowDescriptionFormView;
