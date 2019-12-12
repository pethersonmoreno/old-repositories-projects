import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import './DatePicker.scss';
import CustomInput from './CustomInput';

const DatePicker = ({
  name, placeholder, selected, onChange,
  dateFormat, showTimeInput
}) => (
  <ReactDatePicker
    name={name}
    placeholder={placeholder}
    dateFormat={dateFormat}
    selected={selected}
    onChange={onChange}
    customInput={<CustomInput />}
    withPortal
    showTimeInput={showTimeInput}
  />
);

DatePicker.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  selected: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  dateFormat: PropTypes.string,
  showTimeInput: PropTypes.bool,
};
DatePicker.defaultProps = {
  name: '',
  placeholder: '',
  selected: null,
  dateFormat: 'dd/MM/yyyy',
  showTimeInput: false,
};

export default DatePicker;
