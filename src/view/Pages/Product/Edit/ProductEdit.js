import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PageTemplate from 'Templates/PageTemplate';
import Form from 'Organisms/ProductForm';

const editProduct = (products, productId, history, valores) => {
  const product = products.find(item => item.id === productId);
  product.productTypeId = valores.productTypeId;
  product.brandId = valores.brandId;
  product.sizeId = valores.sizeId;
  product.ean = valores.ean;
  history.push('/product');
};
const Edit = ({
  history, match, products, productTypes, brands, sizes,
}) => {
  const productId = parseInt(match.params.id, 10);
  const product = products.find(item => item.id === productId);
  let conteudo = <Typography>Produto não encontrado</Typography>;
  let productDescription = '';
  if (product !== undefined) {
    const productType = productTypes.find(type => type.id === product.productTypeId);
    const brand = brands.find(item => item.id === product.brandId);
    const size = sizes.find(item => item.id === product.sizeId);
    productDescription = `${productType.description} ${brand.description} ${size.description}`;
    conteudo = (
      <Form
        product={product}
        textoBotao="Alterar"
        onSubmit={valores => editProduct(products, productId, history, valores)}
      />
    );
  }
  return <PageTemplate titulo={`Editar Produto ${productDescription}`}>{conteudo}</PageTemplate>;
};
Edit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  productTypes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  sizes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  brands: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default connect(
  state => ({ ...state.data }),
  null,
)(Edit);
