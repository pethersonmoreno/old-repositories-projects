import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
  inputContainer: {
    position: 'relative',
  },
  textfield:{
    paddingRight: '38px',
  },
  button: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '36px',
    height: '36px',
  },
});
class InputList extends Component{
  constructor(props){
    super(props);
    this.state = {
      items:(props.value?props.value:[]),
      inputValue:''
    }
  }
  onKeyPress(event){
    if(event.key === 'Enter'){
      event.preventDefault();
      this.addItem();
    }
  }
  addItem=()=>{
    const {inputValue, items} = this.state;
    if(inputValue !== ''){
      this.updateItems(items.concat(inputValue));
      this.setState({inputValue:''});
    }
  }
  addItemAndFocusInput=()=>{
    this.addItem();
    this.input.focus();
  }
  removeItem(item){
    const {items} = this.state;
    const index = items.indexOf(item);
    if(index !== undefined){
      this.updateItems(items.filter(itemFiltering=> itemFiltering !== item));
    }
  }
  updateItems(newItems){
    const {onUpdateValue} = this.props;
    this.setState({items:newItems});
    if(onUpdateValue){
      onUpdateValue(newItems);
    }
  }
  render(){
    const {classes, label, fullWidth} = this.props;
    const {inputValue, items} = this.state;
    return (
      <div>
        <div className={classes.inputContainer}>
          <TextField label={label}
            className={classes.textfield}
            value={inputValue}
            inputRef={input => this.input = input}
            onChange={event => this.setState({inputValue:event.target.value})}
            fullWidth={fullWidth}
            onKeyPress={this.onKeyPress.bind(this)}
            onBlur={this.addItem} />
          <Button variant="fab" className={classes.button} color='primary'
            tabindex="-1"
            onClick={this.addItemAndFocusInput}>
            <AddIcon />
          </Button>
        </div>
        <div>
          {items.map(item=>(
            <Chip key={item}
              label={item}
              onClick={this.removeItem.bind(this, item)}
              onDelete={this.removeItem.bind(this, item)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(InputList);