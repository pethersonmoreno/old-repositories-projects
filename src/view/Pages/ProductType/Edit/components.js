import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PageTemplate from '../../../Templates/PageTemplate';
import Form from '../../../Organisms/ProductTypeForm';
import { productTypes, sizes, brands } from '../../../data';

const updateList = (productTypeId, baseList, newList) => {
  baseList
    .filter(item => item.productTypeId === productTypeId)
    .filter(item => newList.indexOf(item.description) === -1)
    .forEach((item) => {
      baseList.splice(baseList.indexOf(item), 1);
    });
  newList
    .filter(description => baseList.find(item => item.description === description) === undefined)
    .forEach(description => baseList.push({
      id: baseList.length,
      productTypeId,
      description,
    }));
};
const editProductType = (productTypeId, history, valores) => {
  const productType = productTypes.find(type => type.id === productTypeId);
  productType.description = valores.description;
  productType.categoryId = valores.categoryId;
  updateList(productType.id, sizes, valores.sizes);
  updateList(productType.id, brands, valores.brands);
  history.push('/productType');
};
const Edit = ({ history, match }) => {
  const productTypeId = parseInt(match.params.id, 10);
  const productType = productTypes.find(type => type.id === productTypeId);
  let conteudo = <Typography>Tipo de Produto não encontrado</Typography>;
  if (productType !== undefined) {
    conteudo = (
      <Form
        productType={productType}
        textoBotao="Alterar"
        onSubmit={valores => editProductType(productTypeId, history, valores)}
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
};
export default Edit;
