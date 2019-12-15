import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './DatePickerMobile.scss';
import CustomInput from '../CustomInput';

const DatePicker = ({
  name, placeholder, selected, onChange,
  showTimeInput
}) => (
  <div>
    <div className="datepicker__date-input-container">
      <CustomInput value={moment(selected).format('DD/MM/YYYY')} onClick={() => {}} />
      <input
        name={name}
        placeholder={placeholder}
        type="date"
        value={moment(selected).format('YYYY-MM-DD')}
        onChange={e => {
          const dateParts = e.target.value.split('-');
          const year = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10);
          const dayOfMonth = parseInt(dateParts[2], 10);
          const newDate = new Date(selected.getTime());
          newDate.setFullYear(year);
          newDate.setMonth(month - 1);
          newDate.setDate(dayOfMonth);
          return onChange(newDate);
        }}
      />
    </div>
    {showTimeInput && (
    <div className="datepicker__time-input-container">
      <CustomInput value={moment(selected).format('hh:mm')} onClick={() => { }} />
      <input
        type="time"
        value={moment(selected).format('hh:mm')}
        onChange={e => {
          const timeParts = e.target.value.split(':');
          const hour = parseInt(timeParts[0], 10);
          const minute = parseInt(timeParts[1], 10);
          const newDate = new Date(selected.getTime());
          newDate.setHours(hour);
          newDate.setMinutes(minute, 0, 0);
          return onChange(newDate);
        }}
      />
    </div>
    )}
  </div>
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
