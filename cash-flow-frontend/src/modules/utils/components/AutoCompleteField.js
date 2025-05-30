import React, { useEffect } from 'react';
import { Autocomplete } from 'react-md';
import PropTypes from 'prop-types';
import useInputValue from '../hooks/useInputValue';

const AutoCompleteField = ({
  id, data,
  value, setValue,
  dataLabel, dataValue,
  label, placeholder
}) => {
  const [search, onChangeSearch, setSearch] = useInputValue('', false);
  useEffect(() => {
    const item = data.find(c => c[dataValue] === value);
    if (item) {
      setSearch(item[dataLabel]);
    }
  }, [data, dataLabel, dataValue, setSearch, value]);
  return (
    <Autocomplete
      id={id}
      label={label}
      placeholder={placeholder}
      dataLabel={dataLabel}
      dataValue={dataValue}
      value={search}
      data={data
        .filter(c => c[dataLabel].toLowerCase().includes(search.toLowerCase()))}
      filter={null}
      onChange={onChangeSearch}
      onAutocomplete={newValue => setValue(newValue)}
      clearOnAutocomplete
    />
  );
};
AutoCompleteField.propTypes = {
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

export default AutoCompleteField;
