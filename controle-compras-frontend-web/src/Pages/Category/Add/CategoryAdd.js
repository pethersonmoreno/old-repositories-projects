import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { operations } from 'controle-compras-frontend-redux/ducks/categories';
import Form from '../CategoryForm';
import { PREFIX_ROUTE as backPath } from '../constants';

const CategoryAdd = (props) => {
  const { history, uid, add } = props;
  return (
    <Form
      backPath={backPath}
      title="Nova Categoria"
      save={data => add(uid, data)}
      onSaved={() => history.push(backPath)}
    />
  );
};
CategoryAdd.propTypes = {
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
)(CategoryAdd);
