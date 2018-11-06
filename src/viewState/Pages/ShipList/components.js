import React from 'react';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import PageTemplate from '../../Templates/PageTemplate';
import ShipListCategoriesBox from '../../Organisms/ShipListCategoriesBox';
import {NAME} from './constants'
import {startShiplist, updateShipListSelected} from './actions'
import {withNavigateTo} from '../../helpers';
import BarTabs from '../../Molecules/BarTabs';
import {ButtonFabContainer, ButtonFab} from '../../Atoms';

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

const getShipListSelected = 
  ({shipLists, shipListIdSelected}) => 
    shipLists && shipLists.find(shipList=>shipList.id === shipListIdSelected);
const isListOpen = 
  props => (getShipListSelected(props) !== undefined);

export const ShipLists = props => {
  const { navigateTo, classes, shipLists, shipListIdSelected} = props;
  const { startShiplist, updateShipListSelected } = props;
  if(!shipLists){
    startShiplist();
  }
  const open = isListOpen(props);
  const tabList = [{value:'new', label: 'Nova', icon: <AddCircleIcon />}];
  if(shipLists){
    tabList.push(...shipLists.map(shipList=>({value:shipList.id, label: shipList.description, icon: <FavoriteIcon />})));
  }
  return (
    <PageTemplate titulo="Não esqueça!" removePadding={true}>
      <div className={classes.root}>
        <BarTabs className={classes.tabsBar} 
            tabList={tabList}
            value={open?shipListIdSelected:'new'} 
            onChange={(event, tabSelected) => (tabSelected !== 'new'?updateShipListSelected(tabSelected):navigateTo(`/shipList/new`))} />
        <ShipListCategoriesBox history={props.history} shipList={getShipListSelected(props)} />
        {open && (
          <ButtonFabContainer>
            <ButtonFab onClick={()=>navigateTo(`/shipList/${shipListIdSelected}`)}><EditIcon /></ButtonFab>
            <ButtonFab onClick={()=>navigateTo(`/shipList/${shipListIdSelected}/item/new`)}><AddIcon /></ButtonFab>
          </ButtonFabContainer>
        )}
      </div>
    </PageTemplate>
  );
}

const mapStateToProps = state => ({
  ...state[NAME]
});
const mapDispatchToProps = dispatch => 
  bindActionCreators({
    startShiplist,
    updateShipListSelected
  }, dispatch);

export const VisibleShipLists = compose(
  connect(mapStateToProps,mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
  withNavigateTo(),
)(ShipLists)

export default VisibleShipLists;