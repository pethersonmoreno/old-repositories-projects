import { connect } from 'react-redux';
import ShipListItemForm from './ShipListItemForm';

const mapStateToProps = state => ({
  productTypes: state.productTypes,
  products: state.products,
});
const mapDispatchToProps = null;
const ShipListItemFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShipListItemForm);

export default ShipListItemFormContainer;
