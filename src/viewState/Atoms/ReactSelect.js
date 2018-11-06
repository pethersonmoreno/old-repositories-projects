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
  menuList:{
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
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}
NoOptionsMessage.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}
Control.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}
Control.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  innerRef: PropTypes.func.isRequired,
};

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}
Option.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  innerRef: PropTypes.func.isRequired,
  isFocused: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}
Placeholder.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}
SingleValue.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}
ValueContainer.propTypes = {
  selectProps: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}
MultiValue.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  removeProps: PropTypes.object.isRequired,
  isFocused: PropTypes.bool.isRequired,
};

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}
Menu.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};
function MenuList(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      innerRef = props.innerRef;
  const newClassName = cx(props.selectProps.classes.menuList, className);
  return (
    <div className={newClassName}
      ref={innerRef}
      {...props.innerProps}>
      {children}
    </div>
  );
}
MenuList.propTypes = {
  className: PropTypes.string,
  cx: PropTypes.object.isRequired,
  innerRef: PropTypes.func,
  selectProps: PropTypes.object.isRequired,
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

const components = {
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

class ReactSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.value
    };
  }

  onChangeUsed(onChange, value){
    this.setState({
      value: value,
    });
    if(onChange !== undefined){
      onChange(value);
    }
  }
  isArray(a) {
    return (!!a) && (a.constructor === Array);
  }
  isObject(a) {
    return (!!a) && (a.constructor === Object);
  }
  render() {
    const { 
      classes, theme, options, placeholder, 
      label, value, onChange, isMulti, 
      selectRef, onKeyDown, autoFocus
    } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    let textFieldProps = undefined;
    let placeHolderUsed = placeholder;
    let shrink = undefined;
    if(this.state.value !== undefined && this.isObject(this.state.value)){
      shrink = (this.state.value.value !== undefined);
    }
    if(label !== undefined){
      textFieldProps = {
        label: label,
        InputLabelProps: {
          shrink: shrink,
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
            clearable={true}
            onChange={this.onChangeUsed.bind(this, onChange)}
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
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  options: PropTypes.any,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  isMulti: PropTypes.bool,
  selectRef: PropTypes.func,
  onKeyDown: PropTypes.func,
  autoFocus: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(ReactSelect);