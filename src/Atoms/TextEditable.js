import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';

const styles = () => ({
  inputContainer: {
    position: 'relative',
    '& > .textField': {
      '& > div': {
        color: 'white',
        '&::before': {
          borderBottomColor: 'rgba(255, 255, 255, 0.42)',
        },
        '&:hover:not(:focus)::before, &:focus::before': {
          borderBottomColor: 'rgba(255, 255, 255, 0.65) !important',
        },
        '&::after': {
          borderBottomColor: 'rgba(255, 255, 255, 1)',
        },
        '& > input': {
          color: 'white',
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
    const { value } = this.props;
    this.state = {
      editing: false,
      value,
    };
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
    const { editing, value } = this.state;
    if (!editing) {
      return;
    }
    if (value === valueProp) {
      this.setState({ editing: false });
      return;
    }
    if (onConfirm) {
      try {
        onConfirm(value);
        this.setState({ editing: false });
      } catch (error) {
        this.focusInput();
      }
      return;
    }
    this.setState({ editing: false, value: valueProp });
  };

  focusInput = () => {
    setTimeout(() => {
      if (this.input) {
        this.input.focus();
      }
    }, 100);
  };

  startEdit = () => {
    this.setState({ editing: true });
  };

  render() {
    const {
      className, classes, label, fullWidth,
    } = this.props;
    const { editing, value } = this.state;
    return (
      <div className={className}>
        <div className={classes.inputContainer}>
          <TextField
            color="inherit"
            label={label}
            className={`textField${editing ? ' textFieldEditing' : ''}`}
            value={value}
            inputRef={(input) => {
              this.input = input;
            }}
            onChange={event => this.setState({ value: event.target.value })}
            fullWidth={fullWidth}
            onKeyPress={this.onKeyPress}
            onFocus={this.startEdit}
            onBlur={this.confirmEdit}
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
      </div>
    );
  }
}

TextEditable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
};
TextEditable.defaultProps = {
  className: null,
  label: '',
  fullWidth: true,
};

export default withStyles(styles, { withTheme: true })(TextEditable);
