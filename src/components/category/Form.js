import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class FormCategory extends Component{
  constructor(props){
    super(props);
    this.state = {
      description: props.description,
    };
  }
  onCallSubmit(event){
    const {onSubmit} = this.props;
    event.preventDefault();
    const data = {
      description: this.state.description,
    };
    // this.setState({description:''});
    onSubmit(event, data);
  }
  render(){
    const {textoBotao} = this.props;
    return (
      <form noValidate autoComplete="on" onSubmit={this.onCallSubmit.bind(this)}>
        <div>
          <TextField label="Descrição" value={this.state.description} 
            fullWidth
            onChange={event => this.setState({description:event.target.value})} />
        </div>
        <div>
          <Button type="submit" variant="contained">{textoBotao}</Button>
        </div>
      </form>
    );
  }
}

