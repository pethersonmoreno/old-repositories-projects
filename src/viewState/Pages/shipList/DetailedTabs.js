import React, {Component} from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import AppBarMaterialUI from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import PageTemplate from '../../Templates/PageTemplate';
import CategoryList from './CategoryList';
import {updateShipListSelected} from '../../actions'
import {shipLists} from '../../data';

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
  componentWillMount(){
    const {shipListIdSelected, updateShipListSelected} = this.props;
    if(!shipListIdSelected && shipLists.length > 0){
      updateShipListSelected(shipLists[0].id);
    }
  }
  handleTabChange = (event, tabSelected) => {
    const {history, updateShipListSelected} = this.props;
    if(tabSelected === 'new'){
      history.push(`/shipList/new`);
    } else {
      updateShipListSelected(tabSelected);
    }
  }
  edit(){
    const { history, shipListIdSelected} = this.props;
    const shipListSelected = shipLists.find(shipList=>shipList.id === shipListIdSelected);
    if(shipListSelected !== undefined){
      history.push(`/shipList/${shipListSelected.id}`);
    }
  }
  addItem(){
    const { history, shipListIdSelected } = this.props;
    const shipListSelected = shipLists.find(shipList=>shipList.id === shipListIdSelected);
    if(shipListSelected !== undefined){
      history.push(`/shipList/${shipListSelected.id}/item/new`);
    }
  }
  
  render(){
    const { history, classes, shipListIdSelected } = this.props;
    let tabSelected = (shipListIdSelected !== undefined?shipListIdSelected:'new');
    const shipListSelected = shipLists.find(shipList=>shipList.id === shipListIdSelected);
    return (
      <PageTemplate titulo="Não esqueça!" removePadding={true}>
        <div className={classes.root}>
          <BarTabs className={classes.tabsBar} shipLists={shipLists}
              tabSelected={tabSelected} handleTabChange={this.handleTabChange} />
          <CategoryList history={history}
            shipList={shipListSelected} />
          {shipListIdSelected && (
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
      </PageTemplate>
    );
  }
}

const mapStateToProps = state => {
  return {
    shipListIdSelected: state.shipList.shipListIdSelected
  }
};
const mapDispatchToProps = dispatch => {
  return {
    updateShipListSelected: (shipListIdSelected) => {
      dispatch(updateShipListSelected(shipListIdSelected))
    }
  }
};

const VisibleDetailedTabs = compose(
  connect(mapStateToProps,mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
)(DetailedTabs)

export default VisibleDetailedTabs;