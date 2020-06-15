/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@morenobr/guideline-react';
import './CashFlowDescriptionFormView.scss';

const CashFlowDescriptionFormView = ({ name, onChangeName, save }) => (
  <div className="cf-paper cash-flow-description-form">
    <input autoFocus name="name" label="Name" value={name} onChange={onChangeName} />
    <Button raised label="Save" onClick={save} />
  </div>
);
CashFlowDescriptionFormView.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};


export default CashFlowDescriptionFormView;
