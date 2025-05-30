import React from 'react';
import './style.scss';

type TInputTextProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  name?: string;
  className?: string;
};

function InputText({ value, onChange, placeholder, name, className }: TInputTextProps) {
  return (
    <input
      className={`input-text ${className || ''}`}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default InputText;
