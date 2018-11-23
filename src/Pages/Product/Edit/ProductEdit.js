import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PageTemplate from 'Templates/PageTemplate';
import { operations } from 'controle-compras-frontend-redux/ducks/products';
import Form from '../ProductForm';

const ProductEdit = (props) => {
  const {
    history,
    match: {
      params: { id: productId },
    },
    uid,
    products,
    edit,
  } = props;
  const product = products.find(item => item.id === productId);
  let conteudo = <Typography>Produto não encontrado</Typography>;
  let productDescription = '';
  if (product !== undefined) {
    const { productType, brand, size } = product;
    productDescription = `${(productType && productType.description) || ''} ${brand} ${size}`;
    conteudo = (
      <Form
        product={product}
        textoBotao="Alterar"
        save={data => edit(uid, product.id, data)}
        onSaved={() => history.push('/product')}
      />
    );
  }
  return <PageTemplate titulo={`Editar Produto ${productDescription}`}>{conteudo}</PageTemplate>;
};
ProductEdit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  edit: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  products: state.products,
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
)(ProductEdit);
