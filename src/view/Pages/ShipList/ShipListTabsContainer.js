import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { operations } from '../../../state/ducks/shipList';
import ShipListTabs from './ShipListTabs';

const mapStateToProps = state => ({
  ...state.shipList,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...operations,
  },
  dispatch,
);

const ShipListTabsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShipListTabs);

export default ShipListTabsContainer;
