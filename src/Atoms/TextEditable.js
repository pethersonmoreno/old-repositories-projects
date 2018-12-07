import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';

const styles = () => ({
  inputContainer: {
    borderColor: 'inherit',
    position: 'relative',
    '& > .textField': {
      borderColor: 'inherit',
      '& > div': {
        borderColor: 'inherit',
        color: 'inherit',
        fontSize: 'inherit',
        '&::before': {
          borderBottomColor: 'inherit',
          opacity: 0.42,
        },
        '&:hover:not(:focus)::before, &:focus::before': {
          borderBottomColor: 'inherit !important',
          opacity: '0.65 !important',
        },
        '&::after': {
          borderBottomColor: 'inherit',
          opacity: 1,
        },
        '& > input': {
          textAlign: 'inherit',
          fontSize: 'inherit',
          color: 'inherit',
        },
      },
    },
    '& > .textFieldEditing': {
      paddingRight: '38px',
    },
    '& > .button': {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: '36px',
      height: '36px',
      minHeight: 'auto',
    },
  },
});
class TextEditable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (value !== prevProps.value) {
      this.input.value = value;
    }
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      const { editing } = this.state;
      event.preventDefault();
      if (!editing) {
        this.startEdit();
        return;
      }
      this.confirmEdit();
    }
  };

  confirmEdit = () => {
    const { onConfirm, value: valueProp } = this.props;
    const { editing } = this.state;
    if (!editing) {
      return;
    }
    if (this.input.value === valueProp) {
      this.setState({ editing: false });
      return;
    }
    if (onConfirm) {
      try {
        onConfirm(this.input.value);
        this.setState({ editing: false });
      } catch (error) {
        this.focusInput();
      }
      return;
    }
    this.setState({ editing: false });
  };

  focusInput = () => {
    setTimeout(() => {
      if (this.input && document.activeElement !== this.input) {
        this.input.focus();
      }
    }, 100);
  };

  startEdit = () => {
    const { editing } = this.state;
    if (editing) {
      return;
    }
    this.setState({ editing: true });
    this.focusInput();
  };

  render() {
    const {
      className, classes, label, fullWidth, value, onConfirm, ...otherProps
    } = this.props;
    const { editing } = this.state;
    return (
      <div className={`${classes.inputContainer} ${className}`}>
        <TextField
          color="inherit"
          label={label}
          className={`textField${editing ? ' textFieldEditing' : ''}`}
          defaultValue={value}
          inputRef={(input) => {
            this.input = input;
          }}
          fullWidth={fullWidth}
          onKeyPress={this.onKeyPress}
          onClick={this.startEdit}
          onFocus={this.startEdit}
          onBlur={this.confirmEdit}
          {...otherProps}
        />
        {editing && (
          <IconButton
            variant="fab"
            color="inherit"
            className="button"
            tabIndex="-1"
            onClick={this.confirmEdit}
          >
            <DoneIcon />
          </IconButton>
        )}
      </div>
    );
  }
}

TextEditable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
};
TextEditable.defaultProps = {
  className: null,
  label: '',
  fullWidth: true,
  value: '',
};

export default withStyles(styles, { withTheme: true })(TextEditable);
