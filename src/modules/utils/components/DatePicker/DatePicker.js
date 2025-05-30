/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import DatePickerDesktop from './DatePickerDesktop';
import DatePickerMobile from './DatePickerMobile';
import isMobile from './isMobile';

const DatePicker = props => {
  if (isMobile()) {
    return (<DatePickerMobile {...props} />);
  }
  return (<DatePickerDesktop {...props} />);
};


export default DatePicker;
