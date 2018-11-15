import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PageTemplate from 'Templates/PageTemplate';
import ButtonFabContainer from 'Atoms/ButtonFabContainer';
import ButtonFab from 'Atoms/ButtonFab';
import BarTabs from 'Molecules/BarTabs';
import { operations } from 'controle-compras-frontend-redux/ducks/shipLists';
import ShipListCategoriesBox from './ShipListCategoriesBox';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabsBar: {
    backgroundColor: theme.palette.background.paper,
  },
  actions: {
    display: 'block',
    width: '100%',
    textAlign: 'right',
  },
});

class ShipListTabs extends Component {
  componentDidMount() {
    const { startShiplistSelection } = this.props;
    startShiplistSelection();
  }

  componentDidUpdate() {
    const { startShiplistSelection } = this.props;
    startShiplistSelection();
  }

  getShipListSelected = () => {
    const { shipLists, shipListIdSelected } = this.props;
    if (!shipLists) return undefined;
    return shipLists.find(shipList => shipList.id === shipListIdSelected);
  };

  isListOpen = () => this.getShipListSelected() !== undefined;

  render() {
    const {
      history, classes, shipLists,
      shipListIdSelected, updateShipListSelected,
      removeShipList,
    } = this.props;
    const open = this.isListOpen();
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
          {open && (
            <CardActions className={classes.actions} disableActionSpacing>

              <IconButton aria-label="Edit ShipList" onClick={() => history.push(`/shipList/${shipListIdSelected}`)}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="Delete ShipList" onClick={() => removeShipList(shipListIdSelected)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          )}
          {open && (
            <ShipListCategoriesBox history={history} shipList={this.getShipListSelected()} />
          )}
          {open && (
            <ButtonFabContainer>
              <ButtonFab onClick={() => history.push(`/shipList/${shipListIdSelected}/item/new`)}>
                <AddIcon />
              </ButtonFab>
            </ButtonFabContainer>
          )}
        </div>
      </PageTemplate>
    );
  }
}
ShipListTabs.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  shipLists: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  shipListIdSelected: PropTypes.string,
  startShiplistSelection: PropTypes.func.isRequired,
  updateShipListSelected: PropTypes.func.isRequired,
  removeShipList: PropTypes.func.isRequired,
};
ShipListTabs.defaultProps = {
  shipLists: [],
  shipListIdSelected: null,
};

const mapStateToProps = state => ({
  shipLists: state.shipLists.shipLists,
  shipListIdSelected: state.shipLists.shipListIdSelected,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    startShiplistSelection: operations.startShiplistSelection,
    updateShipListSelected: operations.updateShipListSelected,
    removeShipList: operations.removeShipList,
  },
  dispatch,
);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true }),
)(ShipListTabs);
