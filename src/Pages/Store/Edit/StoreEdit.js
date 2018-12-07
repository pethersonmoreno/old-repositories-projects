import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { operations } from 'controle-compras-frontend-redux/ducks/stores';
import Form from '../StoreForm';
import { PREFIX_ROUTE as backPath } from '../constants';

const StoreEdit = (props) => {
  const {
    history,
    match: {
      params: { id: storeId },
    },
    uid,
    stores,
    edit,
  } = props;
  const store = stores.find(item => item.id === storeId);
  return (
    <Form
      editing
      backPath={backPath}
      title={`Loja ${store ? store.name : ''}`}
      store={store}
      save={data => edit(uid, storeId, data)}
      onSaved={() => history.push(backPath)}
    />
  );
};
StoreEdit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  stores: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  edit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  stores: state.stores,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    edit: operations.edit,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreEdit);
