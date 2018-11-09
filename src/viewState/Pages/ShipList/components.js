import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import PageTemplate from '../../Templates/PageTemplate';
import ShipListCategoriesBox from '../../Organisms/ShipListCategoriesBox';
import { STATE_NAME } from './constants';
import {
  startShiplist as actionStartShiplist,
  updateShipListSelected as actionUpdateShipListSelected,
} from './actions';
import BarTabs from '../../Molecules/BarTabs';
import { ButtonFabContainer, ButtonFab } from '../../Atoms';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabsBar: {
    backgroundColor: theme.palette.background.paper,
  },
});

const getShipListSelected = ({ shipLists, shipListIdSelected }) => {
  if (!shipLists) return undefined;
  return shipLists.find(shipList => shipList.id === shipListIdSelected);
};
const isListOpen = props => getShipListSelected(props) !== undefined;

export const ShipLists = (props) => {
  const {
    history, classes, shipLists, shipListIdSelected,
  } = props;
  const { startShiplist, updateShipListSelected } = props;
  if (!shipLists) {
    startShiplist();
  }
  const open = isListOpen(props);
  const tabList = [{ value: 'new', label: 'Nova', icon: <AddCircleIcon /> }];
  if (shipLists) {
    tabList.push(
      ...shipLists.map(shipList => ({
        value: shipList.id,
        label: shipList.description,
        icon: <FavoriteIcon />,
      })),
    );
  }
  return (
    <PageTemplate titulo="Não esqueça!" removePadding>
      <div className={classes.root}>
        <BarTabs
          className={classes.tabsBar}
          tabList={tabList}
          value={open ? shipListIdSelected : 'new'}
          onChange={(event, tabSelected) => (tabSelected !== 'new'
            ? updateShipListSelected(tabSelected)
            : history.push('/shipList/new'))
          }
        />
        <ShipListCategoriesBox history={history} shipList={getShipListSelected(props)} />
        {open && (
          <ButtonFabContainer>
            <ButtonFab onClick={() => history.push(`/shipList/${shipListIdSelected}`)}>
              <EditIcon />
            </ButtonFab>
            <ButtonFab onClick={() => history.push(`/shipList/${shipListIdSelected}/item/new`)}>
              <AddIcon />
            </ButtonFab>
          </ButtonFabContainer>
        )}
      </div>
    </PageTemplate>
  );
};
ShipLists.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  shipLists: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  shipListIdSelected: PropTypes.number,
  startShiplist: PropTypes.func.isRequired,
  updateShipListSelected: PropTypes.func.isRequired,
};
ShipLists.defaultProps = {
  shipListIdSelected: undefined,
};

const mapStateToProps = state => ({
  ...state[STATE_NAME],
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    startShiplist: actionStartShiplist,
    updateShipListSelected: actionUpdateShipListSelected,
  },
  dispatch,
);

export const VisibleShipLists = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true }),
)(ShipLists);

export default VisibleShipLists;
