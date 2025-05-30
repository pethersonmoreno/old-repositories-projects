import React from 'react';
import './style.scss';

interface ButtonPropsLearnMore
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  label: string;
}

const ButtonLearnMore = ({ label, onClick, ...otherProps }: ButtonPropsLearnMore) => {
  return (
    <button className="button" onClick={onClick} {...otherProps}>
      <span className="label">{label}</span>
    </button>
  );
};

export default ButtonLearnMore;
