import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { operations } from 'state/ducks/shipLists';
import ShipListAdd from './ShipListAdd';

const mapStateToProps = null;
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addShipList: operations.addShipList,
  },
  dispatch,
);
const ShipListAddContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShipListAdd);
export default ShipListAddContainer;
