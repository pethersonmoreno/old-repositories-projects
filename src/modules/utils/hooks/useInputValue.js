import { useState } from 'react';

const useInputValue = (initialValue, withEventTarget = true) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = eventValue => {
    const newValue = (withEventTarget ? eventValue.target.value : eventValue);
    setValue(newValue);
  };
  return [value, handleChange, setValue];
};

export default useInputValue;
