import React from 'react';
import PropTypes from 'prop-types';
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

const addProductType = (history, valores) => {
  const productTypeId = productTypes.length + 1;
  productTypes.push({ id: productTypeId, ...valores });
  updateList(productTypeId, sizes, valores.sizes);
  updateList(productTypeId, brands, valores.brands);
  history.push('/productType');
};

const Add = ({ history }) => (
  <PageTemplate titulo="Novo Tipo de Produto">
    <Form textoBotao="Adicionar" onSubmit={valores => addProductType(history, valores)} />
  </PageTemplate>
);
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Add;
