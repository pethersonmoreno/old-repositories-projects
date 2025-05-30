import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import './DatePickerDesktop.scss';
import CustomInput from '../CustomInput';

const DatePicker = ({
  name, placeholder, selected, onChange,
  showTimeInput
}) => (
  <ReactDatePicker
    name={name}
    placeholder={placeholder}
    dateFormat={showTimeInput ? 'dd/MM/yyyy hh:mm' : 'dd/MM/yyyy'}
    selected={selected}
    onChange={onChange}
    customInput={<CustomInput />}
    showTimeInput={showTimeInput}
    timeInputLabel={showTimeInput ? 'Time:' : undefined}
  />
);

DatePicker.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  selected: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  showTimeInput: PropTypes.bool,
};
DatePicker.defaultProps = {
  name: '',
  placeholder: '',
  selected: null,
  showTimeInput: false,
};

export default DatePicker;
