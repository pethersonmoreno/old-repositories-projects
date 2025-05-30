import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ButtonFab from 'Atoms/ButtonFab';

const styles = () => ({
  inputIntegerContainer: {
    '& > label': {
      color: 'rgba(0, 0, 0, 0.54)',
      padding: 0,
      fontSize: '12px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1px',
    },
    '& > label.focused': {
      color: '#303f9f',
    },
    '& > div': {
      textAlign: 'center',
      '& .button': {
        width: '40px',
        height: '40px',
        minHeight: '40px',
      },
      '& .buttonLittle': {
        width: '25px',
        height: '25px',
        minHeight: '25px',
      },
      '& .buttonBig': {
        width: '55px',
        height: '55px',
        minHeight: '55px',
      },
      // buttonLittle
      '& .textField': {
        margin: '0 10px',
        '& input': {
          width: '70px',
          textAlign: 'center',
        },
      },
      '& .text': {
        display: 'inline-block',
        margin: '0 3px',
        width: '30px',
        textAlign: 'center',
      },
    },
  },
});
class InputIntegerWithButtons extends Component {
  state = {
    focused: false,
  };

  render() {
    const {
      classes, label, value, onChange, autoFocus, textField, buttonSize,
    } = this.props;
    const { focused } = this.state;
    let classNameButton = 'button';
    if (buttonSize === 'little') {
      classNameButton += ' buttonLittle';
    }
    if (buttonSize === 'big') {
      classNameButton += ' buttonBig';
    }
    return (
      <div className={classes.inputIntegerContainer}>
        {label && (
          <label className={focused ? 'focused' : ''} htmlFor={label}>
            {label}
          </label>
        )}
        <div>
          <ButtonFab
            className={classNameButton}
            disabled={value <= 0}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onChange(value - 1);
            }}
            onFocus={() => this.setState({ focused: true })}
            onBlur={() => this.setState({ focused: false })}
          >
            <RemoveIcon />
          </ButtonFab>
          {!textField && <span className="text">{value}</span>}
          {textField && (
            <TextField
              className="textField"
              id={label}
              inputProps={{
                placeholder: label,
                type: 'number',
                step: '1',
                min: '0',
              }}
              value={value}
              autoFocus={autoFocus}
              onChange={event => onChange(event.target.value)}
              onFocus={() => this.setState({ focused: true })}
              onBlur={() => this.setState({ focused: false })}
            />
          )}
          <ButtonFab
            className={classNameButton}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onChange(value + 1);
            }}
            onFocus={() => this.setState({ focused: true })}
            onBlur={() => this.setState({ focused: false })}
          >
            <AddIcon />
          </ButtonFab>
        </div>
      </div>
    );
  }
}
InputIntegerWithButtons.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.string,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  textField: PropTypes.bool,
  buttonSize: PropTypes.oneOf(['little', 'normal', 'big']),
};
InputIntegerWithButtons.defaultProps = {
  label: null,
  autoFocus: false,
  textField: true,
  buttonSize: 'normal',
};
export default withStyles(styles, { withTheme: true })(InputIntegerWithButtons);
