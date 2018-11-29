import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageWithBackButtonTemplate from 'Templates/PageWithBackButtonTemplate';
import { operations } from 'controle-compras-frontend-redux/ducks/categories';
import Form from '../CategoryForm';

const backPath = '/category';
const Add = (props) => {
  const { history, uid, add } = props;
  return (
    <PageWithBackButtonTemplate backPath={backPath} titulo="Nova Categoria">
      <Form
        description=""
        textoBotao="Adicionar"
        save={data => add(uid, data)}
        onSaved={() => history.push(backPath)}
      />
    </PageWithBackButtonTemplate>
  );
};
Add.propTypes = {
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
)(Add);
