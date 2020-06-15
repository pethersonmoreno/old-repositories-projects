/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@morenobr/guideline-react';
import './AccountFormView.scss';

const AccountFormView = ({
  description, onChangeDescription,
  currentValue, onChangeCurrentValue,
  personId, onChangePersonId, peopleList,
  save,
}) => (
  <div className="cf-paper account-form">
    <input autoFocus placeholder="Description" name="description" label="Description" value={description} onChange={onChangeDescription} />
    <br />
    <br />
    <input placeholder="Current Value" name="currentValue" type="number" label="Current Value" value={currentValue} onChange={onChangeCurrentValue} />
    <br />
    <br />
    <select placeholder="Person" value={personId} onChange={onChangePersonId}>
      <option value=""> </option>
      {peopleList.map(person => (
        <option key={person.id} value={person.id}>{person.name}</option>
      ))}
    </select>
    <br />
    <br />
    <Button raised label="Save" onClick={save} />
  </div>
);
AccountFormView.propTypes = {
  description: PropTypes.string.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  currentValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChangeCurrentValue: PropTypes.func.isRequired,
  personId: PropTypes.string.isRequired,
  onChangePersonId: PropTypes.func.isRequired,
  peopleList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  save: PropTypes.func.isRequired,
};


export default AccountFormView;
