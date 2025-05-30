import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { operations, selectors } from 'controle-compras-frontend-redux/ducks/categories';
import Form from '../CategoryForm';
import { PREFIX_ROUTE as backPath } from '../constants';

const CategoryEdit = (props) => {
  const {
    history, match, uid, categories, edit,
  } = props;
  const categoryId = match.params.id;
  const category = categories.find(item => item.id === categoryId);
  return (
    <Form
      editing
      backPath={backPath}
      title={`Categoria ${category ? category.description : ''}`}
      category={category}
      save={data => edit(uid, categoryId, data)}
      onSaved={() => history.push(backPath)}
    />
  );
};
CategoryEdit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  edit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  categories: selectors.getAllUndeleted(state),
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
)(CategoryEdit);
