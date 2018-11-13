import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { operations } from 'state/ducks/shipLists';
import ShipListTabs from './ShipListTabs';

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

const ShipListTabsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShipListTabs);

export default ShipListTabsContainer;
