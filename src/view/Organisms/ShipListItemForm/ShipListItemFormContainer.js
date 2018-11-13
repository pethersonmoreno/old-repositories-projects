import { connect } from 'react-redux';
import ShipListItemForm from './ShipListItemForm';

const ShipListItemFormContainer = connect(
  state => ({ ...state.data }),
  null,
)(ShipListItemForm);

export default ShipListItemFormContainer;
