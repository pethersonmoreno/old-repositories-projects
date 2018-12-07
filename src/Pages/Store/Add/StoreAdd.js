import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { operations } from 'controle-compras-frontend-redux/ducks/stores';
import Form from '../StoreForm';
import { PREFIX_ROUTE as backPath } from '../constants';

const StoreAdd = (props) => {
  const { history, uid, add } = props;
  return (
    <Form
      backPath={backPath}
      title="Nova Loja"
      save={data => add(uid, data)}
      onSaved={() => history.push(backPath)}
    />
  );
};
StoreAdd.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  add: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.auth.uid,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    add: operations.add,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreAdd);
