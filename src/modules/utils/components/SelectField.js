import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
  id, data,
  value, setValue,
  dataLabel, dataValue,
  label, placeholder
}) => {
  const [state, setState] = useState(value);
  const handleChange = event => {
    const newValue = event.target.value;
    setState(newValue);
    if (setValue) {
      setValue(newValue);
    }
  };
  useEffect(() => {
    if (value) {
      setState(value);
    }
  }, [setState, value]);
  const dropDownList = (
    <select id={id} onChange={handleChange} placeholder={placeholder}>
      {!data.find(item => state === item[dataValue]) && (
        <option value="">-- Select an option --</option>
      )}
      {data.map(item => (
        <option key={item[dataValue]} value={item[dataValue]} selected={state === item[dataValue]}>
          {item[dataLabel]}
        </option>
      ))}
    </select>
  );
  if (label) {
    return (
      <label>
        {label}
        {dropDownList}
      </label>
    );
  }
  return dropDownList;
};
SelectField.propTypes = {
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  dataLabel: PropTypes.string.isRequired,
  dataValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SelectField;
