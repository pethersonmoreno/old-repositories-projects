import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBarMaterialUI from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AppContent from '../AppContent';
import CategoryList from './CategoryList';
import {shipLists} from '../dataApp';

const styles = theme => ({
  root:{
    flexGrow: 1,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabsBar:{
    backgroundColor: theme.palette.background.paper,
  },
});
function BarTabs(props){
  const {className, shipLists, tabSelected, handleTabChange} = props;
  return (
    <AppBarMaterialUI position="static" color="default" className={className}>
      <Tabs
        value={tabSelected}
        onChange={handleTabChange}
        scrollable
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab value="new" label="Nova" icon={<AddCircleIcon />} />
        {shipLists.map(shipList=>(
          <Tab key={shipList.id} value={shipList.id} label={shipList.description} icon={<FavoriteIcon />} />
        ))}
      </Tabs>
    </AppBarMaterialUI>
  );
}

class DetailedTabs extends Component{
  constructor(props){
    super(props);
    this.state = {
      shipListSelected: undefined,
    };
  }
  componentWillMount(){
    if(shipLists.length > 0){
      this.setState({ shipListSelected: shipLists[0]});
    }
  }
  handleTabChange = (event, tabSelected) => {
    const {history} = this.props;
    if(tabSelected === 'new'){
      history.push('/shipList/new');
    } else {
      const shipListSelected = shipLists.find(shipList=>shipList.id === tabSelected);
      this.setState({ shipListSelected});
    }
  }
  edit(){
    const { history } = this.props;
    const {shipListSelected} = this.state;
    if(shipListSelected !== undefined){
      history.push('/shipList/'+shipListSelected.id);
    }
  }
  addItem(){
    const { history } = this.props;
    const {shipListSelected} = this.state;
    if(shipListSelected !== undefined){
      history.push('/shipList/'+shipListSelected.id+'/item/new');
    }
  }
  
  render(){
    const { history, classes } = this.props;
    const { shipListSelected } = this.state;
    let tabSelected = (shipListSelected !== undefined?shipListSelected.id:'new');
    return (
      <AppContent titulo="Não esqueça!" removePadding={true}>
        <div className={classes.root}>
          <BarTabs className={classes.tabsBar} shipLists={shipLists}
              tabSelected={tabSelected} handleTabChange={this.handleTabChange} />
          <CategoryList history={history}
            shipList={shipListSelected} />
          {shipListSelected && (
            <div className='fabContainer'>
              <Button variant="fab" className='fab' color='primary'
                onClick={this.edit.bind(this)}>
                <EditIcon />
              </Button>
              <Button variant="fab" className='fab' color='primary'
                onClick={this.addItem.bind(this)}>
                <AddIcon />
              </Button>
            </div>
          )}
        </div>
      </AppContent>
    );
  }
}
export default withStyles(styles, { withTheme: true })(DetailedTabs);