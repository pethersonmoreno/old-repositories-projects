import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
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
    onSubmit(data);
  }
  render(){
    const {textoBotao} = this.props;
    return (
      <Paper>
        <form noValidate autoComplete="on" onSubmit={this.onCallSubmit.bind(this)}>
          <div>
            <TextField label="Descrição" value={this.state.description} 
              autoFocus={true}
              fullWidth
              onChange={event => this.setState({description:event.target.value})} />
          </div>
          <div className="formButtons">
            <Button type="submit" variant="contained" color="primary">{textoBotao}</Button>
          </div>
        </form>
      </Paper>
    );
  }
}

