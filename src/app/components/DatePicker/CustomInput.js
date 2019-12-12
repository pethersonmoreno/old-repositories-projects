import React from 'react';
import PropTypes from 'prop-types';
import './CustomInput.scss';

class CustomInput extends React.PureComponent {
  render() {
    const { value, onClick } = this.props;
    return (
      <button type="button" className="react-datepicker__custom-input" onClick={onClick}>
        {value}
      </button>
    );
  }
}
CustomInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};
CustomInput.defaultProps = {
  value: '',
  onClick: () => { },
};

export default CustomInput;
