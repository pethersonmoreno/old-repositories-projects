import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { operations } from 'controle-compras-frontend-redux/ducks/stores';
import Form from '../StoreForm';
import { PREFIX_ROUTE as backPath } from '../constants';

const StoreAdd = (props) => {
  const { history, uid, addWithProductsInStore } = props;
  return (
    <Form
      backPath={backPath}
      title="Nova Loja"
      save={data => addWithProductsInStore(uid, data.store, data.productsInStore)}
      onSaved={() => history.push(backPath)}
    />
  );
};
StoreAdd.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  addWithProductsInStore: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.auth.uid,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addWithProductsInStore: operations.addWithProductsInStore,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreAdd);
