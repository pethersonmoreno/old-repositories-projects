import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PageTemplate from 'Templates/PageTemplate';
import { operations } from 'controle-compras-frontend-redux/ducks/productTypes';
import Form from '../ProductTypeForm';

const Edit = (props) => {
  const {
    history,
    match: {
      params: { id: productTypeId },
    },
    uid,
    productTypes,
    edit,
  } = props;
  const productType = productTypes.find(type => type.id === productTypeId);
  let conteudo = <Typography>Tipo de Produto não encontrado</Typography>;
  if (productType !== undefined) {
    conteudo = (
      <Form
        productType={productType}
        textoBotao="Alterar"
        save={data => edit(uid, productTypeId, data)}
        onSaved={() => history.push('/productType')}
      />
    );
  }
  return (
    <PageTemplate titulo={`Tipo de Produto ${productType ? productType.description : ''}`}>
      {conteudo}
    </PageTemplate>
  );
};
Edit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  productTypes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  edit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  productTypes: state.productTypes,
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
)(Edit);
