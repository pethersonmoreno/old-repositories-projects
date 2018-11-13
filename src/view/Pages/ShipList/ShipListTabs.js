import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import PageTemplate from 'Templates/PageTemplate';
import ButtonFabContainer from 'Atoms/ButtonFabContainer';
import ButtonFab from 'Atoms/ButtonFab';
import ShipListCategoriesBox from 'Organisms/ShipListCategoriesBox';
import BarTabs from 'Molecules/BarTabs';

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

class ShipLists extends Component {
  componentDidMount() {
    const { startShiplist } = this.props;
    startShiplist();
  }

  getShipListSelected = () => {
    const { shipLists, shipListIdSelected } = this.props;
    if (!shipLists) return undefined;
    return shipLists.find(shipList => shipList.id === shipListIdSelected);
  };

  isListOpen = () => this.getShipListSelected() !== undefined;

  render() {
    const {
      history, classes, shipLists, shipListIdSelected, updateShipListSelected,
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
            <ShipListCategoriesBox history={history} shipList={this.getShipListSelected()} />
          )}
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
  }
}
ShipLists.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  shipLists: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  shipListIdSelected: PropTypes.number,
  startShiplist: PropTypes.func.isRequired,
  updateShipListSelected: PropTypes.func.isRequired,
};
ShipLists.defaultProps = {
  shipLists: [],
  shipListIdSelected: undefined,
};
export default withStyles(styles, { withTheme: true })(ShipLists);
