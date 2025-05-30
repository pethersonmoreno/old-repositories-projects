import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { css } from 'emotion';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 0,
    left: 0,
    right: 0,
  },
  menuList: {
    maxHeight: '300px',
    overflowY: 'auto',
    paddingBottom: '0px',
    paddingTop: '0px',
    position: 'relative',
    WebkitOverflowScrolling: 'touch',
    boxSizing: 'border-box',
  },
  divider: {
    height: theme.spacing.unit * 1,
  },
  indicatorsContainer: {
    '& > div': {
      padding: '6px',
    },
  },
});

function NoOptionsMessage(props) {
  const { selectProps, children, innerProps } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.noOptionsMessage}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}
NoOptionsMessage.propTypes = {
  selectProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  innerProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};
NoOptionsMessage.defaultProps = {
  innerProps: undefined,
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}
inputComponent.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function Control(props) {
  const {
    selectProps, innerRef, children, innerProps,
  } = props;
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: selectProps.classes.input,
          inputRef: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...selectProps.textFieldProps}
    />
  );
}
Control.propTypes = {
  selectProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  innerProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  innerRef: PropTypes.func.isRequired,
};

function Option(props) {
  const {
    innerRef, children, innerProps, isFocused, isSelected,
  } = props;
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
}
Option.propTypes = {
  selectProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  innerProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  innerRef: PropTypes.func,
  isFocused: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
Option.defaultProps = {
  innerRef: undefined,
};

function Placeholder(props) {
  const { children, innerProps, selectProps } = props;
  return (
    <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
}
Placeholder.propTypes = {
  selectProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  innerProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};
Placeholder.defaultProps = {
  innerProps: undefined,
};

function SingleValue(props) {
  const { children, innerProps, selectProps } = props;
  return (
    <Typography className={selectProps.classes.singleValue} {...innerProps}>
      {children}
    </Typography>
  );
}
SingleValue.propTypes = {
  selectProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  innerProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};
SingleValue.defaultProps = {
  innerProps: undefined,
};

function ValueContainer(props) {
  const { children, selectProps } = props;
  return <div className={selectProps.classes.valueContainer}>{children}</div>;
}
ValueContainer.propTypes = {
  selectProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};
function IndicatorsContainer(props) {
  const {
    children, className, cx, getStyles, selectProps,
  } = props;
  return (
    <div
      className={cx(
        css(getStyles('indicatorsContainer', props)),
        {
          indicators: true,
        },
        classNames(selectProps.classes.indicatorsContainer, className),
      )}
    >
      {children}
    </div>
  );
}
IndicatorsContainer.propTypes = {
  className: PropTypes.string,
  cx: PropTypes.func.isRequired,
  getStyles: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  selectProps: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};
IndicatorsContainer.defaultProps = {
  className: undefined,
  innerRef: undefined,
  innerProps: undefined,
};

function MultiValue(props) {
  const {
    children, selectProps, removeProps, isFocused,
  } = props;
  return (
    <Chip
      tabIndex={-1}
      label={children}
      className={classNames(selectProps.classes.chip, {
        [selectProps.classes.chipFocused]: isFocused,
      })}
      onDelete={removeProps.onClick}
      deleteIcon={<CancelIcon {...removeProps} />}
    />
  );
}
MultiValue.propTypes = {
  selectProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  innerProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  removeProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isFocused: PropTypes.bool.isRequired,
};

function Menu(props) {
  const { children, selectProps, innerProps } = props;
  return (
    <Paper square className={selectProps.classes.paper} {...innerProps}>
      {children}
    </Paper>
  );
}
Menu.propTypes = {
  selectProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  innerProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
function MenuList(props) {
  const {
    children, className, cx, innerRef, selectProps, innerProps,
  } = props;
  const newClassName = cx(selectProps.classes.menuList, className);
  return (
    <div className={newClassName} ref={innerRef} {...innerProps}>
      {children}
    </div>
  );
}
MenuList.propTypes = {
  className: PropTypes.string,
  cx: PropTypes.func.isRequired,
  innerRef: PropTypes.func,
  selectProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  innerProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};
MenuList.defaultProps = {
  className: undefined,
  innerRef: undefined,
  innerProps: undefined,
};

const components = {
  IndicatorsContainer,
  Control,
  Menu,
  MenuList,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

// const isArray = (a) => {
//   return !!a && a.constructor === Array;
// };

const isObject = a => !!a && a.constructor === Object;

class ReactSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  onChangeUsed = (value) => {
    const { onChange } = this.props;
    this.setState({
      value,
    });
    if (onChange !== undefined) {
      onChange(value);
    }
  };

  render() {
    const {
      classes,
      theme,
      options,
      placeholder,
      label,
      value,
      isMulti,
      selectRef,
      onKeyDown,
      autoFocus,
    } = this.props;
    const { value: stateValue } = this.state;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    let textFieldProps;
    let placeHolderUsed = placeholder;
    let shrink = false;
    if (stateValue !== undefined && isObject(stateValue)) {
      shrink = stateValue.value !== undefined;
    }
    if (label !== undefined) {
      textFieldProps = {
        label,
        InputLabelProps: {
          shrink,
        },
      };
      placeHolderUsed = '';
    }
    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            options={options}
            textFieldProps={textFieldProps}
            components={components}
            value={value}
            clearable
            onChange={this.onChangeUsed}
            placeholder={placeHolderUsed}
            isMulti={isMulti}
            autoFocus={autoFocus}
            ref={selectRef}
            onKeyDown={onKeyDown}
          />
        </NoSsr>
      </div>
    );
  }
}

ReactSelect.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  options: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func,
  isMulti: PropTypes.bool,
  selectRef: PropTypes.func,
  onKeyDown: PropTypes.func,
  autoFocus: PropTypes.bool,
};
ReactSelect.defaultProps = {
  options: [],
  placeholder: '',
  label: '',
  value: undefined,
  onChange: undefined,
  isMulti: false,
  selectRef: undefined,
  onKeyDown: undefined,
  autoFocus: false,
};

export default withStyles(styles, { withTheme: true })(ReactSelect);
