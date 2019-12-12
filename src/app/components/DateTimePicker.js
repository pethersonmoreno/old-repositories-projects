import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from './DatePicker';

const DateTimePicker = ({
  name, placeholder, selected, onChange,
}) => (
  <DatePicker
    name={name}
    placeholder={placeholder}
    selected={selected}
    onChange={onChange}
    dateFormat="dd/MM/yyyy hh:mm"
    showTimeInput
    timeInputLabel="Time:"
  />
);

DateTimePicker.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  selected: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
};
DateTimePicker.defaultProps = {
  name: '',
  placeholder: '',
  selected: null,
};

export default DateTimePicker;
